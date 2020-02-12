import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vs from "react-syntax-highlighter/dist/esm/styles/prism/vs"
import vsDark from "react-syntax-highlighter/dist/esm/styles/prism/vs"
import tomorrow from "react-syntax-highlighter/dist/esm/styles/prism/vs"
import dark from "react-syntax-highlighter/dist/esm/styles/prism/dark"
import atomDark from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark"
import coy from "react-syntax-highlighter/dist/esm/styles/prism/coy"
import { Header as ThemeHeader, jsx, useColorMode, Styled } from "theme-ui";
// class CodeBlock extends PureComponent {
//   static propTypes = {
//     value: PropTypes.string.isRequired,
//     language: PropTypes.string
//   };

//   static defaultProps = {
//     language: null
//   };

//   render() {
//     const { language, value } = this.props;
//     return (
//       <SyntaxHighlighter language={language} style={atomDark}>
//         {value}
//       </SyntaxHighlighter>
//     );
//   }
// }


const CodeBlock = (props) => {
  const { language, value } = props;
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  return (
    <SyntaxHighlighter language={language || 'java'} style={isDark ? atomDark : undefined}>
      {value}
    </SyntaxHighlighter>
  );
}
export default CodeBlock;