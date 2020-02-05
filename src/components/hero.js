/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import Img from "gatsby-image"
import BGImage from "./bg-image"

const defaultProps = {
  slim: false,
}

const Hero = ({ children, color, image, slim }) => (
  <section
   sx={{
      position: `relative`,
      height: slim ? [`400px`, `500px`] : [`500px`, `600px`, `700px`, `40vw`],
      maxHeight: `1200px`,
      width: `100%`,
      overflow: `hidden`,
    }}
  >
    <BGImage color={'#3b486e'} slim={slim}>
    {/* <BGImage color={color} slim={slim}> */}
      <Img fluid={image} />
    </BGImage>
    {children}
  </section>
)

export default Hero