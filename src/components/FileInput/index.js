const noop = () => {}

export default function FileInput({
  value,
  accept = ".csv",
  onChange = noop,
  text = "Click to choose a file",
  ...rest
}) {
  return (
    <label
      style={{
        display: "block",
        maxWidth: "200px",
        height: "30px",
        margin: "auto",
        padding: "50px 0",
        textAlign: "center",
        border: "1px dashed",
        textDecoration: "underline",
      }}
    >
      {text}
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        accept={accept}
        onChange={(evt) => {
          onChange(evt)
        }}
      />
    </label>
  )
}
