import { Paper, Typography } from "@mui/material";
import MatchDateView from "../atoms/MatchDateView";
import { EMOJI } from "../../nonview/core/EMOJI.js";

export default function ODIView({ odi, winner }) {
  return (
    <Paper
      sx={{
        margin: 1,
        padding: 1,
        borderColor: winner.color,
        borderStyle: "solid",
        borderWidth: 6,
        borderRadius: 6,
      }}
    >
      <MatchDateView matchDate={odi.date} />
      <Typography variant="subtitle1">{odi.venue.name}</Typography>
      <Typography variant="h6">
        {winner.label}
        {" " + EMOJI.WINNER}
      </Typography>
      <Typography variant="h6">{odi.getOther(winner).label}</Typography>
    </Paper>
  );
}
