import React from "react"
import { Global } from "@emotion/core"
import { Main, css, Styled, useColorMode } from "theme-ui"
import useSiteMetadata from "../hooks/use-site-metadata"
import useNavigation from "../hooks/use-navigation"
import Footer from "./footer"
import Header from "./header"
import SEO from "./seo"

type LayoutProps = { children: React.ReactNode; className?: string; noFooter: boolean }

const NewLayout = ({ children, className, noFooter = false }: LayoutProps) => {
  const meta = useSiteMetadata()
  const nav = useNavigation()
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  console.log('className', className);
  return (
    <Styled.root data-testid="theme-root" sx={{
      height: '100vh',
      overflow: 'auto',
      scrollBehavior: 'smooth',
    }}>
      <Global
        styles={css({
          "*": {
            boxSizing: `inherit`,
            "&:before": {
              boxSizing: `inherit`,
            },
            "&:after": {
              boxSizing: `inherit`,
            },
          },
          body: {
            margin: 0,
            padding: 0,
            boxSizing: `border-box`,
            textRendering: `optimizeLegibility`,
            WebkitFontSmoothing: `antialiased`,
            MozOsxFontSmoothing: `grayscale`,
          },
          "::selection": {
            backgroundColor: `primary`,
            color: `background`,
          },
          hr: {
            background: isDark ? 'hsla(100, 0%, 62%, 0.8)' : 'hsla(0, 0%, 0%, 0.2)',
          },
          a: {
            transition: `all 0.3s ease-in-out`,
          },
        })}
      />
      {/* <div style={{ minHeight: '100vh' }}> */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'auto' }}>
        {/* <SEO /> */}
        <Header meta={meta} nav={nav} />
        {/* <Main className={className}>{children}</Main> */}
        {/* <Main className={className}>{children}</Main> */}
        {children}
        {!noFooter && <Footer />}

      </div>
    </Styled.root>
  )
}

export default NewLayout
