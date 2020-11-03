import React from "react";
import "./styles.css";

function Proof(proof) {
  return (
    <tr key={proof.id}>
      {Object.entries(proof).map((field) => {
        return <td key={`${proof.id}${field[0]}`}>{field[1]}</td>;
      })}
    </tr>
  );
}

export default function ProofsTable({ data }) {
  return (
    <div className="proofs-table-container">
      <table className="proofs-table">
        <tbody>
          <tr key="header">
            {Object.entries(data[0]).map((entry) => {
              return <th key={entry[0]}>{entry[0].toUpperCase()}</th>;
            })}
          </tr>
          {data.map((proof) => {
            return <Proof {...proof} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
