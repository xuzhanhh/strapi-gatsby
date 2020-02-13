import React from "react"
import { Global } from "@emotion/core"
import { Main, css, Styled, useColorMode } from "theme-ui"
import useSiteMetadata from "../hooks/use-site-metadata"
import useNavigation from "../hooks/use-navigation"
import Footer from "./footer"
import Header from "./header"
import SEO from "./seo"

type LayoutProps = { children: React.ReactNode; className?: string }

const NewLayout = ({ children, className }: LayoutProps) => {
  const meta = useSiteMetadata()
  const nav = useNavigation()
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  return (
    <Styled.root data-testid="theme-root">
      <Global
        styles={css({
          "*": {
            boxSizing: `inherit`,
          },
          body: {
            margin: 0,
            padding: 0,
            boxSizing: `border-box`,
            textRendering: `optimizeLegibility`,
          },
          "::selection": {
            backgroundColor: `primary`,
            color: `background`,
          },
          hr: {
            background: isDark? 'hsla(100, 0%, 62%, 0.8)': 'hsla(0, 0%, 0%, 0.2)',
          },
          a: {
            transition: `all 0.3s ease-in-out`,
          },
        })}
      />
      <div style={{ minHeight: '100vh' }}>
        {/* <SEO /> */}
        <Header meta={meta} nav={nav} />
        <Main className={className}>{children}</Main>
        <Footer />
      </div>
    </Styled.root>
  )
}

export default NewLayout
