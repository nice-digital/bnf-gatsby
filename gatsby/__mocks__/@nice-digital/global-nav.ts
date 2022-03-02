// Actual header required because the SiteHeader component is mocked globally (see jest.setup.ts)
export const Header = jest.requireActual("@nice-digital/global-nav").Header;
// Mocked footer as null to avoid noise in tests
export const Footer = jest.fn().mockReturnValue(null);
// Actual main component required
export const Main = jest.requireActual("@nice-digital/global-nav").Main;
