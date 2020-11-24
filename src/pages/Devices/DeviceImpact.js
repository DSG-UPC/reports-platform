import { Typography } from "@material-ui/core"
import React from "react"
import "./styles.css"

export default function DeviceImpact({ device }) {
  return (
    <>
      <Typography variant="h6">Social Impact</Typography>
      <ul className="metrics-list">
        <li>Base Usage: {device.impact.firstUsage} hours</li>
        <li>Extended Life-Time: {device.impact.extendedUsage} hours</li>
        <li>Last Score: {device.impact.lastScore}</li>
      </ul>
    </>
  )
}
