import os from "os";

const isInDocker = !!process.env.IN_DOCKER,
	isTeamCity = !!process.env.TEAMCITY_VERSION,
	cpuCount = os.cpus().length,
	totalMemGB = os.totalmem() / 1024 ** 3;

// "goog:loggingPrefs" is a chromedriver vendor capability that @wdio/types
// doesn't declare, so add it to the capability type rather than dropping it
type ChromeCapabilities = WebdriverIO.Capabilities & {
	"goog:loggingPrefs"?: { browser?: string; performance?: string };
};

// The in-page stall probe costs one extra webdriver round trip per step (~30ms,
// so roughly a minute across a full run). Only CI pays it, and STALL_PROBE=0
// turns it off in one place once the stalls are understood.
const stallProbeEnabled = isInDocker && process.env.STALL_PROBE !== "0",
	// Fast enough to time a block to within a quarter second, slow enough that
	// the timer itself is nothing next to the work the page is doing
	heartbeatIntervalMs = 250;

// Commands that replace the page's JS context and so wipe the probe. wdio names
// `browser.url()` differently depending on the protocol in use - `navigateTo`
// over webdriver, `url` over devtools - so match both rather than guessing.
const NAVIGATION_COMMANDS = new Set(["navigateTo", "url", "refresh", "back"]);

// Which webdriver commands are in flight, so a failed step can report what it
// was actually blocked on. The step's own waitUntil timeouts can't rescue it:
// they only fire between polls, never while awaiting a hung command underneath.
type CommandRecord = { name: string; startedAt: number; durationMs?: number };

const inFlightCommands: CommandRecord[] = [],
	completedCommands: CommandRecord[] = [];

// Must be called before we issue any commands of our own, which would
// otherwise push the real culprit out of the in-flight list
function snapshotCommands(): string {
	const now = Date.now(),
		stuck = inFlightCommands.map(
			(command) => `${command.name} (${now - command.startedAt}ms and counting)`
		),
		recent = completedCommands
			.slice(-8)
			.map((command) => `${command.name}=${command.durationMs}ms`);

	return `in flight: ${stuck.join(", ") || "none"} | last completed: ${
		recent.join(" ") || "none"
	}`;
}

// What the probe recorded inside the page, summarised in the browser so we only
// pull back a few numbers rather than the whole buffer
type StallProbeSummary = {
	installed: boolean;
	ageMs: number;
	beats: number;
	longestGapMs: number;
	gapEndedMsAgo: number;
	longTasks: string[];
	mainAnchors: number;
	domNodes: number;
	jsHeapMB: number | null;
};

type ProbeState = {
	installedAt: number;
	beats: number[];
	longTasks: { at: number; ms: number; attribution: string }[];
};

type ProbeWindow = Window & typeof globalThis & { __stallProbe?: ProbeState };

// Runs IN THE BROWSER, so it has to be self contained: no closure variables, no
// imports, and everything it needs passed as an argument.
//
// The point is to record what happens DURING a stall. Everything else the
// diagnostics collect runs in afterStep, by which time the browser has recovered
// and reports a perfectly healthy page. A heartbeat can't lie about that: if the
// main thread was blocked the interval couldn't fire, so a gap in the timestamps
// is direct proof of a block, and its length and end time bound when it
// happened.
function installStallProbe(intervalMs: number): void {
	const probeWindow = window as ProbeWindow;

	// Steps share a page, so only the first step after a navigation installs it
	if (probeWindow.__stallProbe) return;

	const state: ProbeState = {
		installedAt: Date.now(),
		beats: [],
		longTasks: [],
	};

	probeWindow.__stallProbe = state;

	setInterval(() => {
		state.beats.push(Date.now());
		// A minute's worth at 250ms. Older beats can't be part of a live stall
		if (state.beats.length > 240) state.beats.shift();
	}, intervalMs);

	// Names the script when the thread is blocked by JS rather than by a hung
	// request. Wrapped because "longtask" isn't observable in every browser.
	try {
		new PerformanceObserver((list) => {
			list.getEntries().forEach((entry) => {
				if (entry.duration < 1000) return;

				const { attribution } = entry as PerformanceEntry & {
						attribution?: {
							name?: string;
							containerSrc?: string;
							containerName?: string;
						}[];
					},
					[source] = attribution || [];

				state.longTasks.push({
					at: Date.now(),
					ms: Math.round(entry.duration),
					attribution:
						[source?.name, source?.containerName, source?.containerSrc]
							.filter(Boolean)
							.join(" ") || "unattributed",
				});

				if (state.longTasks.length > 10) state.longTasks.shift();
			});
		}).observe({ entryTypes: ["longtask"] });
	} catch {
		// No longtask support - the heartbeat still tells us about the block
	}
}

// Also runs in the browser. Summarises rather than returning the raw buffers.
function readStallProbe(): StallProbeSummary {
	const state = (window as ProbeWindow).__stallProbe,
		now = Date.now(),
		// Cheap, and it separates "the thread was blocked" from "the link text
		// XPath had to walk an enormous list page" as explanations for a slow
		// findElements
		dom = {
			mainAnchors: document.querySelectorAll("main a").length,
			domNodes: document.getElementsByTagName("*").length,
		},
		{ memory } = performance as Performance & {
			memory?: { usedJSHeapSize: number };
		},
		jsHeapMB = memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : null;

	if (!state)
		return {
			installed: false,
			ageMs: 0,
			beats: 0,
			longestGapMs: 0,
			gapEndedMsAgo: 0,
			longTasks: [],
			jsHeapMB,
			...dom,
		};

	let longestGapMs = 0,
		gapEndedAt = 0;

	state.beats.forEach((beat, index) => {
		if (index === 0) return;

		const gap = beat - state.beats[index - 1];

		if (gap > longestGapMs) {
			longestGapMs = gap;
			gapEndedAt = beat;
		}
	});

	return {
		installed: true,
		ageMs: now - state.installedAt,
		beats: state.beats.length,
		longestGapMs,
		gapEndedMsAgo: gapEndedAt ? now - gapEndedAt : 0,
		longTasks: state.longTasks.map(
			(task) => `${task.ms}ms ${task.attribution} (${now - task.at}ms ago)`
		),
		jsHeapMB,
		...dom,
	};
}

type PerformanceLogEntry = { message?: string; timestamp?: number };

type NetworkEvent = {
	message?: {
		method?: string;
		params?: { requestId?: string; request?: { url?: string } };
	};
};

// Chromedriver's performance log is a stream of raw CDP events. Requests that
// were sent and never reached loadingFinished/loadingFailed are the ones still
// hanging - and a hung request that blocks the page's JS thread is the confirmed
// mechanism behind the Civic cookie banner stalls, so this is the signal that
// named the cause last time, only without having to hope it also logged to the
// console.
//
// Note a page navigation cancels in-flight requests, and those cancellations
// arrive as loadingFailed, so genuinely abandoned requests do drop out. Anything
// still listed here was live when the step gave up.
function summarisePendingRequests(entries: PerformanceLogEntry[]): string[] {
	const started = new Map<string, { url: string; at: number }>(),
		settled = new Set<string>();

	entries.forEach((entry) => {
		if (!entry.message) return;

		let event: NetworkEvent;

		try {
			event = JSON.parse(entry.message) as NetworkEvent;
		} catch {
			return;
		}

		const method = event.message?.method,
			params = event.message?.params,
			requestId = params?.requestId;

		if (!method || !requestId) return;

		if (method === "Network.requestWillBeSent") {
			const url = params?.request?.url;

			if (url) started.set(requestId, { url, at: entry.timestamp || 0 });
		} else if (
			method === "Network.loadingFinished" ||
			method === "Network.loadingFailed"
		) {
			settled.add(requestId);
		}
	});

	const now = Date.now();

	return [...started.entries()]
		.filter(([requestId]) => !settled.has(requestId))
		.map(([, request]) => ({
			...request,
			ageMs: request.at ? now - request.at : 0,
		}))
		.sort((a, b) => b.ageMs - a.ageMs)
		.slice(0, 10)
		.map((request) => `${request.ageMs}ms ${request.url}`);
}

// Dump what the browser was doing when a step failed.
//
// Read the heartbeat first, then the pending requests, then the console.
//
// The only confirmed cause of these step timeouts so far was Civic's cookie
// banner: its licence check to apikeys.civiccomputing.com blocked the page's JS
// main thread, so whatever webdriver command wdio ran next sat there until the
// step timed out. Nothing in the wdio log pointed at it - the console dump
// identified it, which is why "goog:loggingPrefs" is set on the capability. The
// banner only runs at all because docker-compose aliases the site onto a
// nice.org.uk domain, which is what makes its licence valid.
//
// heartbeat  - the honest one. The probe's interval can't fire while the main
//              thread is blocked, so a ~59s gap proves the block and dates it.
//              Lots of small gaps instead would mean CPU contention after all.
// pending    - a request that was sent and never settled. This is how a hung
//              third party call announces itself now that we're not relying on
//              it also happening to log to the console.
// long tasks - names the script if the thread was blocked by JS rather than by
//              a hung request.
// anchors    - if a stall shows NO heartbeat gap but a huge anchor count, then
//              the link text XPath really is just slow on that page and the
//              blocked-thread theory is wrong for that occurrence.
//
// Navigation entries are the other thing to check. A client side Gatsby
// transition leaves the original page's navigation entry in place, so an entry
// whose URL matches the CURRENT location means the browser did a full page load
// where a history API transition was expected - i.e. Gatsby's hard reload
// fallback after a failed page-data/chunk fetch. A failed fetch also shows up as
// a SEVERE browser console entry.
async function logStallDiagnostics(
	errorStack: string,
	commands: string
): Promise<void> {
	const log = (message: string): void =>
		console.log(`[stall-diagnostics] ${message}`);

	const collect = async (): Promise<void> => {
		const state = await browser.execute(() => ({
			url: window.location.href,
			title: document.title,
			readyState: document.readyState,
			navigations: performance.getEntriesByType("navigation").map((entry) => ({
				type: (entry as PerformanceNavigationTiming).type,
				url: entry.name,
				duration: Math.round(entry.duration),
			})),
		}));

		log(`url=${state.url}`);
		log(`title=${state.title} readyState=${state.readyState}`);
		log(`navigations=${JSON.stringify(state.navigations)}`);

		if (stallProbeEnabled) {
			const probe = await browser.execute(readStallProbe);

			if (!probe.installed) log("probe: not installed on this page");
			else
				log(
					`probe: age=${probe.ageMs}ms beats=${probe.beats} longestGap=${probe.longestGapMs}ms (ended ${probe.gapEndedMsAgo}ms ago) heap=${probe.jsHeapMB}MB`
				);

			log(`dom: main anchors=${probe.mainAnchors} nodes=${probe.domNodes}`);

			if (probe.longTasks.length)
				probe.longTasks.forEach((task) => log(`  long task: ${task}`));
			else log("long tasks: none over 1s");
		}

		// getLogs is a chromedriver/selenium endpoint so it's only available over
		// the webdriver protocol, i.e. the grid in Docker and not devtools locally.
		// The log buffer resets on read, so this holds everything logged since the
		// previous failed step.
		if (isInDocker && typeof browser.getLogs === "function") {
			if (stallProbeEnabled) {
				const pending = summarisePendingRequests(
					(await browser.getLogs("performance")) as PerformanceLogEntry[]
				);

				log(`pending requests: ${pending.length || "none"}`);
				pending.forEach((request) => log(`  ${request}`));
			}

			const entries = (await browser.getLogs("browser")) as {
				level?: string;
				message?: string;
			}[];

			log(`browser console: ${entries.length} entries`);
			entries.forEach((entry) => log(`  ${entry.level}: ${entry.message}`));
		}
	};

	log(`step failed: ${errorStack.split("\n")[0]}`);
	log(commands);

	let timer: NodeJS.Timeout | undefined;

	try {
		await Promise.race([
			collect(),
			// Never let a wedged session hang the run. Hitting this is itself a
			// result: it means the browser is still blocked after the step timeout.
			new Promise<never>((_resolve, reject) => {
				timer = setTimeout(
					() => reject(new Error("gave up after 15s, session still blocked")),
					15000
				);
			}),
		]);
	} catch (diagnosticError) {
		log(`could not collect: ${(diagnosticError as Error).message}`);
	} finally {
		clearTimeout(timer);
	}
}

export const config: WebdriverIO.Config = {
	// Use devtools to control Chrome when we're running tests locally
	// Avoids issues with having the wrong ChromeDriver installed via selenium-standalone when Chrome updates every 6 weeks.
	// We need to use webdriver protocol in Docker because we use the selenium grid.
	automationProtocol: isInDocker ? "webdriver" : "devtools",

	maxInstances: isInDocker ? 2 : 1,
	path: "/wd/hub",
	port: 4444,

	specs: ["./features/**/*.feature"],

	exclude: ["./features/**/header.feature", "./features/**/searchPage.feature"],

	capabilities: [
		{
			browserName: "chrome",
			// Buffer browser console entries so logStallDiagnostics can dump them
			// when a step fails. Failed resource fetches log at SEVERE.
			// The performance log is the raw CDP event stream, which is how we spot
			// a request that was sent and never came back - see
			// summarisePendingRequests. Both buffers are only read on failure.
			//
			// NO perfLoggingPrefs alongside this. Chromedriver 98 (selenium 4.1.2)
			// rejects an unrecognised key outright - the session never starts and
			// every spec fails at once, which is how build 1669 died on
			// `tracingCategories` (@wdio/types declares that name; chromedriver's is
			// `traceCategories`). The defaults are what we want anyway: network and
			// page events on, tracing off. Don't add it back to "be explicit".
			"goog:loggingPrefs": {
				browser: "ALL",
				...(stallProbeEnabled ? { performance: "ALL" } : {}),
			},
			"goog:chromeOptions": {
				args: [
					"--window-size=1920,1080",
					// Automation optimizations as per https://github.com/GoogleChrome/chrome-launcher/blob/master/docs/chrome-flags-for-tools.md
					"--disable-dev-shm-usage",
					"--enable-automation",
					"--disable-extensions",
					"--disable-component-extensions-with-background-pages",
					"--disable-background-networking",
					"--disable-sync",
				].concat(isInDocker ? "--headless" : []),
			},
		},
	] as ChromeCapabilities[],

	// bail: 1,
	logLevel: "error",

	// Run against the production build of the Gatsby site by default as dev mode renders on demand so causes timing issues
	baseUrl: "http://localhost:9000/",
	reporters: [
		"spec",
		isTeamCity && "teamcity",
		isInDocker && [
			"allure",
			{
				useCucumberStepReporter: true,
				// Turn on screenshot reporting for error shots
				disableWebdriverScreenshotsReporting: false,
			},
		],
	].filter(Boolean) as WebdriverIO.Config["reporters"],

	framework: "cucumber",
	cucumberOpts: {
		require: [
			"./steps/**/*.ts",
			"./node_modules/@nice-digital/wdio-cucumber-steps/lib/index.js",
		],
		tags: "not @pending", // See https://docs.cucumber.io/tag-expressions/
		// Need quite a long timeout here because some of the Axe a11y tests take a while for longer pages (like drugs A to Z)
		timeout: 60000,
	},

	onPrepare: function () {
		console.log(
			`[wdio.conf] Running in ${isInDocker ? "Docker" : "local"}${
				isTeamCity ? " (TeamCity)" : ""
			} → CPUs: ${cpuCount} | Memory: ${totalMemGB.toFixed(1)} GB`
		);
	},

	// Reinstall on every step because the probe lives in the page's JS context, so
	// any navigation wipes it - and the step that stalls runs straight after a
	// page open. It no-ops if it's already there, so the cost is the round trip.
	//
	// If the page is ALREADY wedged this install is what hangs, and the in flight
	// snapshot will name `execute` rather than the command the step meant to run.
	// The heartbeat gap still dates the block, so we lose the command name but not
	// the finding.
	beforeStep: async function () {
		if (!stallProbeEnabled) return;

		try {
			await browser.execute(installStallProbe, heartbeatIntervalMs);
		} catch {
			// Diagnostics must never be the reason a step fails
		}
	},

	beforeCommand: function (commandName) {
		inFlightCommands.push({ name: commandName, startedAt: Date.now() });
	},

	afterCommand: async function (commandName) {
		// lastIndexOf so nested commands (waitForExist calling isExisting, say)
		// unwind in the right order
		const index = inFlightCommands
			.map((command) => command.name)
			.lastIndexOf(commandName);

		if (index > -1) {
			const [finished] = inFlightCommands.splice(index, 1);

			completedCommands.push({
				...finished,
				durationMs: Date.now() - finished.startedAt,
			});

			if (completedCommands.length > 12) completedCommands.shift();
		}

		// beforeStep alone is not enough. A navigation destroys the page's JS
		// context, so a step that opens a page loses the probe installed at its
		// start - and that is exactly the shape that stalls: build 1694 hung in
		// `I open the medical devices page` and reported "probe: not installed on
		// this page", losing the one measurement that can prove whether the main
		// thread was blocked. Reinstalling the moment the navigation returns
		// closes that window.
		//
		// The install issues execute/executeScript, which re-enter these hooks
		// once. Neither is a navigation command, so it stops there.
		if (!stallProbeEnabled || !NAVIGATION_COMMANDS.has(commandName)) return;

		try {
			await browser.execute(installStallProbe, heartbeatIntervalMs);
		} catch {
			// Diagnostics must never be the reason a step fails
		}
	},

	afterStep: async function (_test, _scenario, { error }) {
		// Take screenshots on error, these end up in the Allure reports
		if (error) {
			// Snapshot first: everything below issues commands of its own
			const commands = snapshotCommands();

			await browser.takeScreenshot();
			await logStallDiagnostics(error, commands);
		}
	},

	afterScenario: async function (_world, _result, _context) {
		// Clear session storage after each test because Gatsby stores scroll
		// positions of each page, which causes issues running multiple tests
		// on the same page in the same browser instance when scrolling to links
		await browser.execute("window.sessionStorage.clear()");
	},

	autoCompileOpts: {
		autoCompile: true,
		// see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
		// for all available options
		tsNodeOpts: {
			transpileOnly: true,
			project: "tsconfig.json",
		},
	},
};
