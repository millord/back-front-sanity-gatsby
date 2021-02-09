import React from "react"
import Template from "./template"
import "./index.css"
import CreateSiteForm from "./createSiteForm"

export default function Container() {
  return (
    <div className="container">
      <CreateSiteForm />
      <Template />
    </div>
  )
}
