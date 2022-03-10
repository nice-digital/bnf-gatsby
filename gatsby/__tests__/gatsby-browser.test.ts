import { type Location } from "@reach/router";
import { type RouteUpdateArgs } from "gatsby";

import { onRouteUpdate } from "../gatsby-browser";

const test = {
	prevLocation: {
		href: "http://localhost:8000/elsewhere/",
		pathname: "/elsewhere/",
	},
} as RouteUpdateArgs;

describe("gatsby-browser", () => {
	describe("onRouteUpdate behaviour", () => {
		beforeEach(() => {
			window.dataLayer = [];
		});

		it.todo("request animationframe");

		it.todo("should push a page view to the data layer when the path changes");

		it.only("Should push the prevLocation to the data layer", () => {
			onRouteUpdate({
				prevLocation: null,
				location: { href: "somewhere" },
			} as unknown as RouteUpdateArgs);

			console.log("###", window.dataLayer);
			expect(window.dataLayer).toHaveLength(1);
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
	});
});

// expect(window.dataLayer[0]).toStrictEqual({ event: "pageview" });
