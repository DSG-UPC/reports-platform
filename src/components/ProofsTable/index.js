import React from "react";
import "./styles.css";

function ProofRow(proof) {
  return (
    <tr>
      {Object.entries(proof).map((field) => {
        return <td key={`${proof.id}${field[0]}`}>{field[1]}</td>;
      })}
    </tr>
  );
}

export default function ProofsTable({ name = "noname", data }) {
  if (data.length === 0) return <></>;
  return (
    <table className="proofs-table">
      <caption>{name}</caption>
      <tbody>
        {/* <tr>
          <th colSpan="100%">{name.toUpperCase()}</th>
        </tr> */}
        <tr>
          {Object.entries(data[0]).map((entry) => {
            return <th key={entry[0]}>{entry[0]}</th>;
          })}
        </tr>
        {data.map((proof) => {
          return <ProofRow key={proof.id} {...proof} />;
        })}
      </tbody>
    </table>
  );
}
