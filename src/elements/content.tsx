/** @jsx jsx */
import React from "react"
import { css, jsx } from "theme-ui"
import { ParallaxLayer } from "react-spring/renderprops-addons.cjs"

type ContentProps = {
  speed: number
  offset: number
  children?: React.ReactNode
  className?: string
  factor?: number
}

const Content = ({ speed, offset, children, className, factor }: ContentProps) => (
  <ParallaxLayer
    className={className}
    sx={{
      padding: [3, 4, 4, 5],
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      justifyContent: `center`,
      zIndex: 50,
    }}
    speed={speed}
    offset={offset}
    factor={factor || 1}
  >
    {children}
  </ParallaxLayer>
)

export default Content
