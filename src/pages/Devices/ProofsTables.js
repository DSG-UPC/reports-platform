import React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import ProofsTable from "./ProofsTable"

const useStyles = makeStyles({
  title: {
    marginTop: "30px",
  },
})

export default function ProofsTables({ data }) {
  const classes = useStyles()

  if (data.length === 0) return <></>
  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Proofs
      </Typography>
      <Box mt={2}>
        <ProofsTable name="Function Proofs" data={data.functionproofs} />
      </Box>
      <Box mt={2}>
        <ProofsTable name="Recycle Proofs" data={data.recycleproofs} />
      </Box>
      <Box mt={2}>
        <ProofsTable name="Data Wipe Proofs" data={data.datawipeproofs} />
      </Box>
      <Box mt={2}>
        <ProofsTable name="Reuse Proofs" data={data.reuseproofs} />
      </Box>
      <Box mt={2}>
        <ProofsTable name="Transfer Proofs" data={data.transferproofs} />
      </Box>
    </>
  )
}
