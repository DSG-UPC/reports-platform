import React from "react"
import * as CheckStamp from "./CheckStamp"
import * as CreateStamp from "./CreateStamp"

export default function ValidateReport() {
  return (
    <div>
      <h1>Stamps</h1>
      <CreateStamp />
      <CheckStamp />
    </div>
  )
}
