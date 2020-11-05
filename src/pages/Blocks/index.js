import React from "react";
import { useParams } from "react-router-dom";
import { useFetchBlock, useFetchBlockLogs } from "hooks";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";



export default function Blocks() {
  const { blocknum } = useParams();
  const block = useFetchBlock(blocknum);
  const events = useFetchBlockLogs(blocknum);

  return (
    <div>
      <h1>Block {blocknum}</h1>
      {block.status === "error" && <p>{block.error}</p>}
      {block.status === "fetched" && (
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Height</TableCell>
                <TableCell>{block.data.number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Timestamp: </TableCell>
                <TableCell>{block.data.timestamp}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hash: </TableCell>
                <TableCell>{block.data.hash}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Parent hash: </TableCell>
                <TableCell>{block.data.parentHash}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Size: </TableCell>
                <TableCell>{block.data.number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Difficulty: </TableCell>
                <TableCell>{block.data.difficulty}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gas Limit: </TableCell>
                <TableCell>{block.data.gasLimit.toNumber()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gas Used: </TableCell>
                <TableCell>{block.data.gasUsed.toNumber()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {events.status === "error" && <p>{events.error}</p>}
      {events.status === "fetched" && "events fetched"}
    </div>
  );
}

        // <TableContainer>
        //   <Table>
        //     <TableBody>
        //       Events
        //     </TableBody>
        //   </Table>
        // </TableContainer>