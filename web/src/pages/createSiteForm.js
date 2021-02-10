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
  fontType: "sans-serif",
  fontsize: "16",
  titleBgColor: "",
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
          <input
            value={state.title}
            type="text"
            placeholder="Name your site"
            required
            name="title"
            onChange={updateFieldValue("title")}
          />

          <label htmlFor="titleBgColor" style={{ display: "block" }}>
            Header Background
          </label>
          <select
            name="cars"
            id="cars"
            value={state.titleBgColor}
            onChange={updateFieldValue("titleBgColor")}
          >
            <option value="blue">Blue</option>
            <option value="pink">Pink</option>
            <option value="teal">Teal</option>
            <option value="red">Red</option>
          </select>

          <label htmlFor="fontType" style={{ display: "block" }}>
            Font Family
          </label>
          <select
            name="fontType"
            value={state.fontType}
            onChange={updateFieldValue("fontType")}
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
            <option value="emoji">Emoji</option>
          </select>
          <label htmlFor="fontsize" style={{ display: "block" }}>
            Font Size
          </label>
          <select
            name="fontsize"
            value={state.fontsize}
            onChange={updateFieldValue("fontsize")}
          >
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="24">24px</option>
            <option value="30">30px</option>
          </select>
          <button type="submit" className="progress-btn">
            Create Site
          </button>
        </form>
      </div>
      <div>
        <Template
          title={state.title}
          fontType={state.fontType}
          titleBgColor={state.titleBgColor}
          fontsize={state.fontsize}
        />
      </div>
    </div>
  )
}
