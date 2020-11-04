import React, { useState } from "react";
import { FileInput } from "components";
import { Keccak } from "sha3";
// import hash from "object-hash";
import { useFetchEvents } from "hooks";

export default function CheckStamp() {
  const [hash, setHash] = useState("");
  const [submittedHash, setSubmittedHash] = useState("");
  const { stamps } = useFetchEvents(submittedHash);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmittedHash(hash);
  };

  const handleChange = (evt) => {
    if (
      evt.target.files[0] !== undefined &&
      evt.target.files[0].type === "text/csv"
    ) {
      const file = evt.target.files[0];
      const keccak = new Keccak(256);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        keccak.update(content);
        const hash = "0x" + keccak.digest("hex");
        setHash(hash); //most important thing
      };
      reader.readAsText(file);
    } else if (
      evt.target.files[0] !== undefined &&
      evt.target.files[0].type !== "text/csv"
    )
      alert("Only CSV");
  };

  return (
    <>
      <h3>Check Stamp</h3>
      <form onSubmit={handleSubmit}>
        <FileInput value={hash} onChange={handleChange} />
        {hash && (
          <p className="hash">
            <b>Hash of content:</b> {hash}
          </p>
        )}
        <button type="submit">Submit</button>
      </form>
      {stamps.status === "fetching" && <p>fetching...</p>}
      {stamps.status === "error" && <p>{stamps.error}</p>}
      {stamps.status === "fetched" && (
        <div>
          <p>Stamps found:</p>
          <ul>
            {stamps.data.map((stamp) => (
              <li key={stamp.i}>{stamp.date.toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
