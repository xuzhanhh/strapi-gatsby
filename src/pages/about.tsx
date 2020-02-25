/** @jsx jsx */

import React, { useEffect, useRef } from "react"
import { Parallax } from "react-spring/renderprops-addons.cjs"
import Layout from "../components/new-layout"
import Layout2 from "../component/layout";
import Hero from "../component/hero"
import Projects from "../component/projects"
import About from "../component/about"
import Contact from "../component/contact"
import { graphql } from "gatsby"
import { css, jsx, useColorMode } from 'theme-ui';

const Cara = (props) => {
  const { data: { strapiAbout: { intro, contact, about } } } = props;
  const cssData = css({ overflow: 'visible', position: 'relation', flex: '1' })()
  const tempRef = useRef();
  const [colorMode, setColorMode] = useColorMode()
  console.log(cssData);
  useEffect(()=>{
    document.getElementById('test2').className = tempRef.current.className;
  })
  return (
    <Layout noFooter={true}>
      <Parallax id="test2" pages={5} style={cssData}>
        <Hero offset={0} data={intro} />
        <Projects offset={1} />
        <About offset={3} data={about} />
        <Contact offset={4} data={contact} />
      </Parallax>
      <div id="test" ref={tempRef} sx={{ overflow: 'visible', backgroundColor: `background`, }}></div>
    </Layout >

  )
}

export default Cara

export const pageQuery = graphql`
query aboutQuery {
  strapiAbout {
    id
    intro
    contact
    about
  }
}
`