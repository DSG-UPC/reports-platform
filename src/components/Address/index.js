import "./styles.css"

export default function Address({ value }) {
  if (typeof value !== "string") return "Not a string";
  const beginning = value.substring(0, 4);
  const end = value.substring(value.length - 5, value.length - 1);
  const str = "0x" + beginning + "..." + end;
  return (
    <div
      className="address"
      onClick={(evt) => {
        navigator?.clipboard?.writeText(value).then(
          function () {
            console.log("Async: Copying to clipboard was successful!");
            console.log(value);
          },
          function (err) {
            console.error("Async: Could not copy text: ", err);
          }
        );
      }}
    >
    {str}
    </div>
  );
}
