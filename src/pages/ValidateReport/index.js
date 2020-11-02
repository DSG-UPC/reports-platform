import React, { useState } from "react";
import { FileInput } from "components";
import { Keccak } from "sha3";
// import hash from "object-hash";
import { useGetEvents } from "hooks";


export default function ValidateReport() {
  const [hash, setHash] = useState("");

  const [
    loading,
    submitted,
    success,
    events,
    error,
    searchEvents,
  ] = useGetEvents();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (hash !== "") {
      searchEvents(hash);
    }
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
      <h1>Validate Report</h1>
      <form onSubmit={handleSubmit}>
        <FileInput value={hash} onChange={handleChange} />
        {hash && (
          <p className="hash">
            <b>Hash of content:</b> {hash}
          </p>
        )}
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {submitted &&
        (success ? (
          <>
            <h3 style={{ color: "green" }}>success</h3>
            <ul>
              {events.map((event) => (
                <li key={event.i}>{event.date.toGMTString()}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 style={{ color: "red" }}>failure</h3>
            <p>Error: {error}</p>
          </>
        ))}
    </>
  );
}
