import React from "react";
import { useParams } from "react-router-dom";
// import ethers from "ethers";
import { useFetchBlock } from "hooks";

// const iface = new ethers.utils.Interface(
//   require("contracts/DepositDevice.json").abi
// );

export default function Blocks() {
  const { blocknum } = useParams();
  // const [events, setEvents] = useState([]);
  const block = useFetchBlock(blocknum);
  console.log(block);

  return (
    <div>
      <h1>Block {blocknum}</h1>
      {block.status === "error" && <p>{block.error}</p>}
      {block.status === "fetched" && (
        <table>
          <tbody>
            <tr>
              <td>Height: </td>
              <td>{block.data.number}</td>
            </tr>
            <tr>
              <td>Timestamp: </td>
              <td>{block.data.timestamp}</td>
            </tr>
            <tr>
              <td>Hash: </td>
              <td>{block.data.hash}</td>
            </tr>
            <tr>
              <td>Parent hash: </td>
              <td>{block.data.parentHash}</td>
            </tr>
            <tr>
              <td>Size: </td>
              <td>{block.data.number}</td>
            </tr>
            <tr>
              <td>Difficulty: </td>
              <td>{block.data.difficulty}</td>
            </tr>
            <tr>
              <td>Gas Limit: </td>
              <td>{block.data.gasLimit.toNumber()}</td>
            </tr>
            <tr>
              <td>Gas Used: </td>
              <td>{block.data.gasUsed.toNumber()}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
