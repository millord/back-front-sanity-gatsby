import React from "react"
import Header from "../components/header"
import { graphql, useStaticQuery } from "gatsby"

// sanity api setup
// const sanityClient = require("@sanity/client")
// const client = sanityClient({
//   projectId: "706zvazg",
//   dataset: "production",
//   token:
//     "skYgMxCDCbPHNTuYdBVBX88PkCc8Jv8pYUc3PyyWheeeFxwlrME8kkiBJIOBvmNcKS9Yuj7sscxwMc0wM", // or leave blank to be anonymous user
//   useCdn: true,
// })

// const templateQuery = graphql`
//   query OtherMyQuery {
//     allSanityTemplateData {
//       edges {
//         node {
//           title
//           titleBgColor
//           _id
//         }
//       }
//     }
//   }
// `

const findOneQuery = graphql`
  query getOneQuery {
    sanityTemplateData {
      _id
      title
    }
  }
`

export default function ({ title, titleBgColor = "blue" }) {
  const { sanityTemplateData } = useStaticQuery(findOneQuery)

  return (
    <div className="template-styles">
      {/* <StaticQuery
        query={templateQuery}
        render={data =>
          data.allSanityTemplateData.edges.map(({ node }, index) => (
            <Header
              key={index}
              color={titleBgColor || node.titleBgColor}
              siteTitle={title || node.title}
            />
          ))
        }
      /> */}
      <Header
        color={titleBgColor || sanityTemplateData.titleBgColor}
        style={{
          marginBottom: `1.45rem`,
        }}
        siteTitle={title || sanityTemplateData.title}
      />
      <section>
        <h2>Content section </h2>
      </section>

      <footer
        style={{
          marginTop: `2rem`,
        }}
      >
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}
