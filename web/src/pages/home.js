import React, { useReducer } from "react"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "706zvazg",
  dataset: "production",
  token:
    "skYgMxCDCbPHNTuYdBVBX88PkCc8Jv8pYUc3PyyWheeeFxwlrME8kkiBJIOBvmNcKS9Yuj7sscxwMc0wM", // or leave blank to be anonymous user
  useCdn: true,
})

const INITIAL_STATE = {
  _type: "blogPost",
  name: "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value }

    default:
      return INITIAL_STATE
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const handleSubmit = event => {
    event.preventDefault()
    console.log("its working!")

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
    <div>
      <h2>Generate HTML HERE</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={state.name}
          type="text"
          placeholder="Enter Post"
          required
          name="name"
          onChange={updateFieldValue("name")}
        />

        <button type="submit">Submit</button>
        <a href="/">Cancel</a>
      </form>
    </div>
  )
}
