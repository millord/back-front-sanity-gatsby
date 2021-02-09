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

// UPDATING
client
  .patch("7x5hkJBuoJKga49kaX12V8") // Document ID to patch
  .set({ name: "MODIFIED" }) // Shallow merge
  .commit() // Perform the patch and return a promise
  .then(updatedBike => {
    console.log("Hurray, the bike is updated! New document:")
    console.log(updatedBike)
  })
  .catch(err => {
    console.error("Oh no, the update failed: ", err.message)
  })

// Delete a documente
// client
//   .delete("11Z9UYIOpi3kNYocwHi57l")
//   .then(res => {
//     console.log("Post deleted")
//   })
//   .catch(err => {
//     console.error("Delete failed: ", err.message)
//   })

// findOne
// client.getDocument("7x5hkJBuoJKga49kaX12V8").then(bike => {
//   console.log(`${bike.name}`)
// })

export default function Home() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const handleSubmit = event => {
    event.preventDefault()
    console.log("its working!")
    /// CREATE IN SANITY
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

        <button type="submit" className="progress-btn">
          Continue
        </button>
      </form>
    </div>
  )
}
