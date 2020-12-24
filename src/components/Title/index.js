import { Box, Divider, Typography } from "@material-ui/core"

export default function Title({ text, icon, subtitle }) {
  return (
    <>
      <Box>
        <Box display="flex" alignItems="center">
          {icon}
          <Typography
            style={{
              marginLeft: "10px",
              fontSize: "calc(20px + 1vw)",
            }}
            component="span"
          >
            {text}
          </Typography>
        </Box>
        <Typography variant="subtitle1" style={{ marginTop: "5px" }}>
          {subtitle}
        </Typography>
      </Box>
      <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />
    </>
  )
}
