import React, { useReducer } from "react"
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
  _type: "templateData",
  title: "",
  titleBgColor: "",
  // image: "",
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

  const handleSubmit = event => {
    event.preventDefault()

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
    return INITIAL_STATE
  }

  return (
    <div className="container">
      <div className="home-styles">
        <h3>Let's create your site</h3>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block" }}>Site Name</label>
          <input
            value={state.title}
            type="text"
            placeholder="Name your site"
            required
            name="title"
            onChange={updateFieldValue("title")}
          />
          <label style={{ display: "block" }}>Header Color</label>
          <input
            value={state.titleBgColor}
            type="text"
            placeholder="Enter Color"
            required
            name="titleBgColor"
            onChange={updateFieldValue("titleBgColor")}
          />

          {/* <input
            value={state.image}
            type="file"
            required
            name="image"
            onChange={updateFieldValue("image")}
            accept="image/*"
          /> */}

          <button type="submit" className="progress-btn">
            Create Site
          </button>
        </form>
      </div>
      <div>
        <Template
          title={state.title}
          image={state.image}
          titleBgColor={state.titleBgColor}
        />
      </div>
    </div>
  )
}
