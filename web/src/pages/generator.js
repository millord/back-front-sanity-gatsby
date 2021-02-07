import React from "react"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "706zvazg",
  dataset: "production",
  token:
    "skYgMxCDCbPHNTuYdBVBX88PkCc8Jv8pYUc3PyyWheeeFxwlrME8kkiBJIOBvmNcKS9Yuj7sscxwMc0wM", // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
})

export default function () {
  const doc = {
    _type: "blogPost",
    name: "test from front 2",
    sponsor: {
      _type: "sponsor",
      name: "millord",
      url: "www.jmillord.dev",
    },
  }

  client.create(doc).then(res => {
    console.log(`Bike was created, document ID is ${res._id}`)
  })

  return (
    <div>
      <h2>Generate HTML HERE</h2>
      {/* <form onSubmit={createPost}> */}
      <form>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Post"
          // onChange={e => setTitle(e.target.value)}
          required
          // value={title}
        ></input>

        <button type="submit">Submit</button>
        <a href="/">Cancel</a>
      </form>
    </div>
  )
}
