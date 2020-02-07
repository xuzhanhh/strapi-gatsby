import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allStrapiSection: {
    edges: {
      node: {
        id: string;
        title: string;
      }
    }[]
  }
}

const useNavigation = () => {
  const data = useStaticQuery<Props>(graphql`
    query MyQuery {
      allStrapiSection {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `)
  // return []
  return data.allStrapiSection.edges.map(item => item.node)

}

export default useNavigation