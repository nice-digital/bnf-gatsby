/* eslint-disable @typescript-eslint/no-unused-vars */
// See https://www.gatsbyjs.org/docs/unit-testing/#mocking-gatsby
const React = require("react");

const navigate = jest.fn();

module.exports = {
	navigate,
	graphql: jest.fn((str) => str[0]),
	Link: jest.fn().mockImplementation(
		// these props are invalid for an `a` tag
		({
			activeClassName,
			activeStyle,
			getProps,
			innerRef,
			partiallyActive,
			ref,
			replace,
			to,
			onClick,
			...rest
		}) =>
			React.createElement("a", {
				...rest,
				href: to,
				onClick: jest.fn((e) => {
					onClick && onClick(e);

					if (!e.defaultPrevented) {
						e.preventDefault(); // To stop "Not implemented: navigation (except hash changes)" warnings
						// Call the navigate mock function, so tests can asserts on calls to the mock
						navigate(to);
					}
				}),
			})
	),
	StaticQuery: jest.fn(),
	useStaticQuery: jest.fn(),
};
