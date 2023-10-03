import { Paper, Typography } from "@mui/material";
import MatchDateView from "../atoms/MatchDateView";

export default function ODIView({ odi, winner }) {
  return (
    <Paper sx={{ margin: 1, padding: 1 }}>
      <MatchDateView date={odi.date} />
      <Typography variant="subtitle1">{odi.venue.name}</Typography>
      <Typography variant="h6">{odi.title}</Typography>
      <Typography variant="h6">{winner.label}</Typography>
    </Paper>
  );
}
