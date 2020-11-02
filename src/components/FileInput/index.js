const noop = () => {};

export default function FileInput({ value, onChange = noop, ...rest }) {
  return (
    <div>
      <label style={{textDecoration: "underline"}}>
        Click to choose file{" "}
        <input
          {...rest}
          style={{ display: "none" }}
          type="file"
          accept='.csv'
          onChange={(evt) => {
            onChange(evt);
          }}
        />
      </label>
      <br />
    </div>
  );
}
