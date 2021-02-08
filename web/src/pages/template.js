import React from "react"
import { StaticQuery, graphql } from "gatsby"

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
