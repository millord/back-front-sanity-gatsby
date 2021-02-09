import React from "react"
import Header from "../components/header"
import Layout from "../components/layout"

export default function Template() {
  return (
    <div className="template-styles">
      <Header siteTitle="Header" />
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
