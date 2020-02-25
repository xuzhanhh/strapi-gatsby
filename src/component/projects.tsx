/** @jsx jsx */
import { jsx } from "theme-ui"
import Divider from "../elements/divider"
import Inner from "../elements/inner"
import Content from "../elements/content"
import SVG from "./svg"
import { UpDown, UpDownWide } from "../styles/animations"
// @ts-ignore
// import ProjectsMDX from "../sections/projects.mdx"
import ProjectCard from '../components/project-card';
const Projects = ({ offset }: { offset: number }) => (
  <div>
    <Divider
      bg="linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)"
      sx={{ clipPath: `polygon(0 15%, 100% 25%, 100% 85%, 0 75%)` }}
      speed={-0.2}
      offset={1.1}
      factor={2}
    ></Divider>
    <Content speed={0.4} offset={offset + 0.2} factor={2}>
      <Inner>
        <div
          sx={{
            display: `grid`,
            gridGap: [4, 4, 4, 5],
            gridTemplateColumns: [`1fr`, `1fr`, `repeat(2, 1fr)`],
            h2: { gridColumn: `-1/1`, color: `white !important` },
          }}
        >
          {/* <ProjectsMDX /> */}

          <ProjectCard
            title="title"
            link="#"
            bg="linear-gradient(to right, #D4145A 0%, #FBB03B 100%)"
          >
            hooks learning
</ProjectCard>
          {/* <ProjectCard
            title="Harry Potter"
            link="https://www.behance.net/gallery/52915793/Harry-Potter"
            bg="linear-gradient(to right, #662D8C 0%, #ED1E79 100%)"
          >
            I entered the DOCMA 2017 award with this Harry Potter inspired image.
</ProjectCard>
          <ProjectCard
            title="Tomb Raider"
            link="https://www.behance.net/gallery/43907099/Tomb-Raider"
            bg="linear-gradient(to right, #009245 0%, #FCEE21 100%)"
          >
            Recreation of a Tomb Raider Wallpaper (Fan Art)
</ProjectCard>
          <ProjectCard
            title="Eagle"
            link="https://www.behance.net/gallery/38068151/Eagle"
            bg="linear-gradient(to right, #D585FF 0%, #00FFEE 100%)"
          >
            A fantasy image manipulation relocating the habitat of wild animals.
</ProjectCard> */}

        </div>
      </Inner>
    </Content>
    <Divider speed={0.1} offset={offset} factor={2}>
      <UpDown>
        <SVG icon="box" width={6} color="icon_brightest" left="85%" top="75%" />
        <SVG icon="upDown" width={8} color="icon_teal" left="70%" top="20%" />
        <SVG icon="triangle" width={8} stroke color="icon_orange" left="25%" top="5%" />
        <SVG icon="circle" hiddenMobile width={24} color="icon_brightest" left="17%" top="60%" />
      </UpDown>
      <UpDownWide>
        <SVG icon="arrowUp" hiddenMobile width={16} color="icon_green" left="20%" top="90%" />
        <SVG icon="triangle" width={12} stroke color="icon_brightest" left="90%" top="30%" />
        <SVG icon="circle" width={16} color="icon_yellow" left="70%" top="90%" />
        <SVG icon="triangle" hiddenMobile width={16} stroke color="icon_teal" left="18%" top="75%" />
        <SVG icon="circle" width={6} color="icon_brightest" left="75%" top="10%" />
        <SVG icon="upDown" hiddenMobile width={8} color="icon_green" left="45%" top="10%" />
      </UpDownWide>
      <SVG icon="circle" hiddenMobile width={6} color="icon_brightest" left="4%" top="20%" />
      <SVG icon="circle" width={12} color="icon_pink" left="80%" top="60%" />
      <SVG icon="box" width={6} color="icon_orange" left="10%" top="10%" />
      <SVG icon="box" width={12} color="icon_yellow" left="29%" top="26%" />
      <SVG icon="hexa" width={16} stroke color="icon_red" left="75%" top="30%" />
      <SVG icon="hexa" width={8} stroke color="icon_yellow" left="80%" top="70%" />
    </Divider>
  </div>
)

export default Projects
