import { Keccak } from "sha3"
import { FileInput } from "components"

export default function UploadReport({ hash, setHash }) {
  const handleChange = async (evt) => {
    if (evt.target.files[0]?.type === "text/csv") {
      const file = evt.target.files[0]
      const keccak = new Keccak(256)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        keccak.update(content)
        const hash = keccak.digest("hex")
        setHash(hash)
      }
      reader.readAsText(file)
    } else if (evt.target.files[0]?.type !== "text/csv") {
      alert("Only CSV")
    }
  }

  return (
    <>
      <FileInput value={hash} onChange={handleChange}></FileInput>
      {hash && (
        <div style={{ textAlign: "center" }}>
          <p>File hash:</p>
          <p style={{ overflowWrap: "break-word" }}> 0x{hash}</p>
        </div>
      )}
    </>
  )
}
