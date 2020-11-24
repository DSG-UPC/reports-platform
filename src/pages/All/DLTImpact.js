import React from "react"
import { Typography } from "@material-ui/core"
import "./styles.css"

export default function DLTImpact({ data }) {
  return (
    <>
      <Typography variant="h6">Impact</Typography>
      <ul className="metrics-list">
        <li>
          Total Extended Life-Time: {data.all.impact.totalExtendedUsage} hours
        </li>
      </ul>
      <Typography variant="h6">Proofs</Typography>
      <ul className="metrics-list">
        <li>#Proofs: {data.all.proofs.total}</li>
        <li>#Recycle Proofs: {data.all.proofs.recycleProofs}</li>
        <li>#Function Proofs: {data.all.proofs.functionProofs}</li>
        <li>#Data Wipe Proofs: {data.all.proofs.datawipeProofs}</li>
        <li>#Reuse Proofs: {data.all.proofs.reuseProofs}</li>
        <li>#Transfer Proofs: {data.all.proofs.transferProofs}</li>
      </ul>
    </>
  )
}
