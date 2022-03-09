import React from "react";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate } from "gatsby";
import { RouteUpdateArgs } from "gatsby";

describe("gatsby-browser", () => {
	describe("onRouteUpdate behaviour", () => {
		window.dataLayer = [];
		it("Should push the prevLocation and current location to the data layer on route update", () => {
			console.log("!!! ", window.dataLayer);
			expect(true).toBe(false);
		});
	});
});

// it.each([
// 	["CLS", "99000"],
// 	["FCP", "88"],
// ])("should send %s metic to the dataLayer", (prevLocation, location) => {
// 	expect(window.dataLayer).toContainEqual({
// 		location,
// 		referrer: prevLocation,
// 	});
// });
