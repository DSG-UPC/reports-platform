import {
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"
import React from "react"
// import ProofsTables from "./ProofsTables"
import "./styles.css"

const useStyles = makeStyles({
  title: {
    marginTop: "30px",
  },
  report: {
    marginTop: "5%",
    maxWidth: 600,
    margin: "auto",
    padding: "40px",
    overflowX: "auto",
  },
})

export default function DeviceImpact({ device }) {
  const classes = useStyles()
  return (
    <Paper variant="outlined" square className={classes.report}>
      <Typography variant="h5">Social Impact</Typography>
      <List>
        <ListItem>Base Usage: {device.impact.firstUsage} hours</ListItem>
        <ListItem>
          Extended Lifetime: {device.impact.extendedUsage} hours
        </ListItem>
        <ListItem>Last Score: {device.impact.lastScore}/10</ListItem>
      </List>

      <Typography variant="h5" className={classes.title}>
        Proofs
      </Typography>
      <List>
        {Object.entries(device.proofs).map((entry, index) => (
          <ListItem key={index}>
            #{entry[0]}: {entry[1].length}
          </ListItem>
        ))}
      </List>

      {/* <ProofsTables data={device.proofs} /> */}
    </Paper>
  )
}
