import React from "react"
import { StaticQuery, graphql } from "gatsby"

// const sanityClient = require("@sanity/client")
// const client = sanityClient({
//   projectId: "706zvazg",
//   dataset: "production",
//   token:
//     "skYgMxCDCbPHNTuYdBVBX88PkCc8Jv8pYUc3PyyWheeeFxwlrME8kkiBJIOBvmNcKS9Yuj7sscxwMc0wM", // or leave blank to be anonymous user
//   useCdn: true,
// })

export default function Template() {
  const ALL_STRINGS_QUERY = graphql`
    query MyQuery {
      allSanityBlogPost {
        totalCount
        edges {
          node {
            name
          }
        }
      }
    }
  `

  // findOne
  // client.getDocument("7x5hkJBuoJKga49kaX12V8").then(bike => {
  //   console.log(`${bike.name}`)
  // })

  return (
    <div>
      <h2>here the template</h2>
      <StaticQuery
        query={ALL_STRINGS_QUERY}
        render={data => (
          <ul>
            {data.allSanityBlogPost.edges.map(({ node }, index) => (
              <li key={index}>{node.name}</li>
            ))}
          </ul>
        )}
      />
    </div>
  )
}
