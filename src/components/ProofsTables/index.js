import React from 'react'
import {Box} from "@material-ui/core"
import { ProofsTable } from "components";

export default function ProofsTables({data}) {
    if (data.length === 0) return <></>
    return (
      <>
        <Box mt={3}>
          <ProofsTable
            name="Function Proofs"
            data={data.functionproofs}
          />
        </Box>
        <Box mt={3}>
          <ProofsTable
            name="Recycle Proofs"
            data={data.recycleproofs}
          />
        </Box>
        <Box mt={3}>
          <ProofsTable
            name="Data Wipe Proofs"
            data={data.datawipeproofs}
          />
        </Box>
        <Box mt={3}>
          <ProofsTable
            name="Reuse Proofs"
            data={data.reuseproofs}
          />
        </Box>
        <Box mt={3}>
          <ProofsTable
            name="Transfer Proofs"
            data={data.transferproofs}
          />
        </Box>
      </>
    );
}