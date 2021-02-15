/** @jsx jsx */
import { jsx, Styled, Flex } from "theme-ui"
import { Link } from "gatsby"

type Props = {
  nav: {
    title: string
    id: string
  }[]
}

const Navigation = ({ nav }: Props) => (
  <Flex
    as="nav"
    sx={{
      // flex: 1,
      justifyContent: `flex-start`,
      order: [2, 1],
      "a:not(:last-of-type)": {
        mr: 3,
      },
    }}
    aria-label="Primary Navigation"
  >
    {nav.map(n => (
      <Styled.a
        as={Link}
        sx={{ color: `text`, ":hover": { color: `primary`, textDecoration: `none` } }}
        key={n.id}
        to={n.title}
      >
        {n.title}
      </Styled.a>
    ))}
    {/* <Styled.a
      as={Link}
      sx={{ color: `text`, ":hover": { color: `primary`, textDecoration: `none` } }}
      to={'/about'}
    >
      关于
        </Styled.a> */}
  </Flex>
)

export default Navigation
