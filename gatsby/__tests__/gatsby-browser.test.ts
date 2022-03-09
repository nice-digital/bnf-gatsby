import { RouteUpdateArgs } from "gatsby";

describe("gatsby-browser", () => {
	describe("onRouteUpdate behaviour", () => {
		beforeEach(() => {
			window.dataLayer.length = 0;
		});

		it.todo(
			"Should push the prevLocation and current location to the data layer on route update"
		);
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
