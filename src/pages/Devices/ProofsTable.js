import React from "react"
import { BlockLink, Address } from "components"
import ethers from "ethers"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
} from "@material-ui/core"

export default function ProofsTable({ name, data }) {
  if (data.length === 0) return <></>
  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <Typography component="div" variant="subtitle" color="primary">
        {name}
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow style={{ backgroundColor: "#ddd" }}>
              {Object.entries(data[0]).map((keyvalue) => {
                const align = keyvalue[0] === "block" ? "left" : "right"
                return (
                  <TableCell align={align} key={keyvalue[0]}>
                    {keyvalue[0]}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((proof) => {
              return <ProofRow key={proof.id} {...proof} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function ProofRow(proof) {
  return (
    <TableRow>
      {Object.entries(proof).map((keyvalue) => {
        const align = keyvalue[0] === "block" ? "left" : "right"
        return (
          <TableCell key={`${keyvalue[0]}${keyvalue[1]}`} align={align}>
            {(() => {
              if (keyvalue[0] === "block") {
                return <BlockLink blocknum={keyvalue[1]} />
              } else if (ethers.utils.isAddress(keyvalue[1])) {
                return <Address value={keyvalue[1]} />
              } else return keyvalue[1]
            })()}
          </TableCell>
        )
      })}
    </TableRow>
  )
}
