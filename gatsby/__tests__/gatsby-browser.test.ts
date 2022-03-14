import { waitFor } from "@testing-library/react";
import { type RouteUpdateArgs } from "gatsby";

import { onRouteUpdate } from "../gatsby-browser";

describe("gatsby-browser", () => {
	describe("onRouteUpdate behaviour", () => {
		beforeEach(() => {
			window.dataLayer = [];
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		it("should push a page view to the data layer when the path changes", async () => {
			onRouteUpdate({
				prevLocation: { href: "elsewhere", pathname: "/elsewhere" },
				location: { href: "somewhere", pathname: "/somewhere" },
			} as unknown as RouteUpdateArgs);

			await waitFor(() => {
				expect(window.dataLayer).toHaveLength(2);
			});

			expect(window.dataLayer[0]).toStrictEqual({
				location: "somewhere",
				referrer: "elsewhere",
			});

			expect(window.dataLayer[1]).toStrictEqual({
				event: "pageview",
			});
		});

		it("should NOT push a page view to the data layer when the path does NOT change", async () => {
			onRouteUpdate({
				prevLocation: { href: "somewhere", pathname: "/somewhere" },
				location: {
					href: "somewhere#someanchor",
					pathname: "/somewhere",
				},
			} as unknown as RouteUpdateArgs);

			await waitFor(() => {
				expect(window.dataLayer).toHaveLength(1);
			});

			expect(window.dataLayer[0]).toStrictEqual({
				location: "somewhere#someanchor",
				referrer: "somewhere",
			});
		});

		it("Should push the prevLocation to the data layer", async () => {
			onRouteUpdate({
				prevLocation: {
					href: "elsewhere",
				},
				location: { href: "somewhere" },
			} as unknown as RouteUpdateArgs);

			await waitFor(() => {
				expect(window.dataLayer).toHaveLength(1);
			});

			expect(window.dataLayer[0]).toStrictEqual({
				location: "somewhere",
				referrer: "elsewhere",
			});
		});

		it("Should push the current location to the data layer", () => {
			onRouteUpdate({
				prevLocation: null,
				location: { href: "somewhere" },
			} as unknown as RouteUpdateArgs);

			expect(window.dataLayer).toHaveLength(1);
			expect(window.dataLayer[0]).toStrictEqual({
				location: "somewhere",
				referrer: "",
			});
		});

		it("should push a referrer to the data layer", () => {
			jest.spyOn(document, "referrer", "get").mockReturnValue("some referrer");
			onRouteUpdate({
				prevLocation: null,
				location: { href: "somewhere" },
			} as unknown as RouteUpdateArgs);

			expect(window.dataLayer).toHaveLength(1);
			expect(window.dataLayer[0]).toStrictEqual({
				location: "somewhere",
				referrer: "some referrer",
			});
		});

		it("Should use request animationframe delay before push to the data layer", async () => {
			const spy: jest.SpyInstance = jest
				.spyOn(window, "requestAnimationFrame")
				.mockImplementation((callback: FrameRequestCallback): number => {
					callback(0);
					return 0;
				});

			onRouteUpdate({
				prevLocation: { href: "elsewhere", pathname: "/elsewhere" },
				location: { href: "somewhere", pathname: "/somewhere" },
			} as unknown as RouteUpdateArgs);

			expect(spy).toHaveBeenCalledTimes(2);

			await waitFor(() => {
				expect(window.dataLayer).toHaveLength(2);
			});

			spy.mockRestore();
		});

		it.skip("should use set timeout when request animation frame is not available", async () => {
			// jest.useFakeTimers();
			// jest.spyOn(global, "setTimeout");
			// onRouteUpdate({
			// 	prevLocation: { href: "elsewhere", pathname: "/elsewhere" },
			// 	location: { href: "somewhere", pathname: "/somewhere" },
			// } as unknown as RouteUpdateArgs);
			// await waitFor(() => {
			// 	jest.advanceTimersByTime(32);
			// 	expect(setTimeout).not.toHaveBeenCalled();
			// });
			// expect(window.dataLayer).toHaveLength(2);
			// expect(setTimeout).toHaveBeenCalledTimes(1);
		});
	});
});

// const mockRaf = undefined;
// jest.spyOn(window, 'setTimeout')

// const originalWindow = { ...window };
// const windowSpy = jest.spyOn(global, "window", "get");
// windowSpy.mockImplementation(() => {
// 	return {
// 		...originalWindow,
// 	};
// });
