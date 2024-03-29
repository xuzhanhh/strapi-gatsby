/** @jsx jsx */
import { Header as ThemeHeader, jsx, useColorMode, Styled } from "theme-ui"
import { Link } from "gatsby"
import Navigation from "./navigation"
import SocialLinks from "./social-links"
import Logo from "../assets/mimigonlogo_raw.png"
import LogoLine from "../assets/mimigonlogo_line.png"
import { Helmet } from "react-helmet"
// import { SearchProvider } from './search/useSearch'
type MetaType = {
  meta: {
    [key: string]: string
  }
  nav: {
    title: string
    slug: string
  }[]
}
const Header = ({ meta, nav }: MetaType) => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    setColorMode(isDark ? `light` : `dark`)
  }
  // const navEmpty = true
  const navEmpty = nav?.length == 0

  return (
    <ThemeHeader>
      {!navEmpty && <Navigation nav={nav} />}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
      </Helmet>
      <div
        sx={{
          fontWeight: `bold`,
          fontSize: 4,
          display: `flex`,
          flex: navEmpty ? 1 : [`1 0 100%`, 1],
          justifyContent: navEmpty ? `flex-start` : `center`,
          order: [1, 2],
        }}
      >
        <Styled.a
          aria-label={`${meta.title}, Back to homepage`}
          as={Link}
          sx={{
            display: "flex",
            color: `text`,
            ":hover": { color: `primary`, textDecoration: `none` },
          }}
          to="/"
        >
          {meta.title}
          <img
            src={isDark ? LogoLine : Logo}
            style={{
              width: 50,
              height: 54,
              marginBottom: 0,
              filter: `contrast(${isDark ? 0 : 1}) brightness(${
                isDark ? 2 : 1
              })`,
            }}
          />
        </Styled.a>
      </div>

      <div
        sx={{
          a: {
            fontSize: 4,
            color: `text`,
            display: `flex`,
            alignItems: `center`,
            "&:hover": {
              color: `primary`,
            },
            "&:not(:first-of-type)": {
              ml: 2,
            },
          },
          justifyContent: `flex-end`,
          flex: 1,
          display: `flex`,
          order: 3,
        }}
      >
        {/* <SearchProvider> </SearchProvider> */}
        {/* <SocialLinks /> */}

        <button
          sx={{ variant: `buttons.toggle`, fontWeight: `semibold` }}
          onClick={toggleColorMode}
          type="button"
          aria-label="Toggle dark mode"
        >
          {isDark ? `Light` : `Dark`}
        </button>
      </div>
    </ThemeHeader>
  )
}

export default Header
