import React, { useState } from "react";
import { FileInput } from "components";
import { Keccak } from "sha3";
import ethers from "ethers";

export default function CreateStamp() {
  const [hash, setHash] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    try {
      const signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();

      const stampProof = new ethers.Contract(
        "0xAE135bE1A8ab17aF2F92EdFb7Bf67d4e29623865",
        require("contracts/StampProofs.json").abi,
        signer
      );

      stampProof.setProof(hash);
    } catch (error) {
      console.log(error)
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
      <h3>Create Stamp</h3>
      <form onSubmit={handleSubmit}>
        <FileInput value={hash} onChange={handleChange} />
        {hash && (
          <p className="hash">
            <b>Hash of content:</b> {hash}
          </p>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
