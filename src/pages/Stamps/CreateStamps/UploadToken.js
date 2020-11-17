import { FileInput } from "components"

export default function UploadToken({ token, setToken }) {
  const handleChange = (evt) => {
    if (evt.target.files[0]?.type === "application/json") {
      const file = evt.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        const object = JSON.parse(content)
        setToken(object.token)
      }
      reader.readAsText(file)
    } else if (evt.target.files[0]?.type !== "application/json") {
      alert("Only JSON")
    }
  }

  return (
    <>
      <form>
        <FileInput
          value={token}
          accept=".json"
          onChange={handleChange}
          text={"Enter a Pre-Paid Token"}
        ></FileInput>
      </form>
      {token !== "" && (
        <>
          <p>Token:</p>
          <p style={{ overflowWrap: "break-word" }}> 0x{token}</p>
        </>
      )}
    </>
  )
}
