import { Typography } from "@mui/material";
import { EMOJI } from "../../nonview/core/EMOJI.js";

export default function TeamView({ team, isWinner }) {
  const emoji = isWinner ? EMOJI.WINNER : "";

  return (
    <Typography variant="h6">
      {team.label}
      {" " + emoji}
    </Typography>
  );
}
