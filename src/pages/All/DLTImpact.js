import {
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles({
  title: {
    marginTop: "30px",
  },
  report: {
    marginTop: "5%",
    maxWidth: 600,
    margin: "auto",
    padding: "40px",
    overflowX: "auto",
  },
})

export default function DLTImpact({ data }) {
  const classes = useStyles()
  return (
    <Paper variant="outlined" square className={classes.report}>
      <Typography variant="h5">Social Impact</Typography>
      <List>
        <ListItem>
          Total Extended Lifetime: {data.all.impact.totalExtendedUsage} hours
        </ListItem>
      </List>
      <Typography variant="h5" className={classes.title}>
        Proofs
      </Typography>
      <List>
        {Object.entries(data.all.proofs).map((entry, index) => (
          <ListItem key={index}>
            #{entry[0]}: {entry[1]}
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
