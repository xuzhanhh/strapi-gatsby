import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allSitePage: {
    edges: {
      path: string
    }[]
  }
}

const useNavigation = () => {
  // const data = useStaticQuery<Props>(graphql`
  //   query {
  //     allSitePage {
  //   edges {
  //     node {
  //       id
  //       path
  //       context {
  //         id
  //       }
  //     }
  //   }
  // }
  //   }
  // `)
  // return []
  // return data.allSitePage.edges
  return [  {
    title: '技术',
    path: '/fgn'
  },{
    title: '霏gn',
    path: '/fgn'
  },
  {
    title: '游记',
    path: '/fgn'
  }]
}

export default useNavigation