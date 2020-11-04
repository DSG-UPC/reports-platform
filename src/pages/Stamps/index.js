import React from "react";
import { default as CheckStamp } from "./CheckStamp";
import { default as CreateStamp } from "./CreateStamp";

export default function ValidateReport() {
  return (
    <div>
      <h1>Stamps</h1>
      <CreateStamp />
      <CheckStamp />
    </div>
  );
}
