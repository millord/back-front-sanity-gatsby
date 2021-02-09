import React, { useState, useReducer } from "react"
import Template from "./template"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "706zvazg",
  dataset: "production",
  token:
    "skYgMxCDCbPHNTuYdBVBX88PkCc8Jv8pYUc3PyyWheeeFxwlrME8kkiBJIOBvmNcKS9Yuj7sscxwMc0wM", // or leave blank to be anonymous user
  useCdn: true,
})

export const INITIAL_STATE = {
  _type: "blogPost",
  name: "",
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value }

    default:
      return INITIAL_STATE
  }
}

export default function CreateSiteForm() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  // const [name, setName] = useState("")
  const handleSubmit = event => {
    event.preventDefault()
    console.log("name is: ", state)

    // CREATE IN SANITY
    client.create(state).then(res => {
      console.log(`document was created, document ID is ${res._id}`)
    })
  }

  const updateFieldValue = field => event => {
    dispatch({
      type: "updateFieldValue",
      field,
      value: event.target.value,
    })
  }

  return (
    <div className="container">
      <div className="home-styles">
        <h3>Let's create your site</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={state.name}
            type="text"
            placeholder="Name your site"
            required
            name="name"
            onChange={updateFieldValue("name")}
          />

          <input
            // value={state.name}
            type="file"
            required
            name="image"
            onChange={updateFieldValue("name")}
            accept="image/*"
          />

          <button type="submit" className="progress-btn">
            Continue
          </button>
        </form>
      </div>
      <div>
        <Template name={state.name} />
      </div>
    </div>
  )
}