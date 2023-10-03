import { Typography } from "@mui/material";
import { EMOJI } from "../../nonview/core/EMOJI.js";

export default function TeamView({ team, isWinner }) {
  const emoji = isWinner ? EMOJI.WINNER : "";
  const opacity = isWinner ? 1 : 0.4;
  return (
    <Typography variant="h6" sx={{ opacity }}>
      {team.label}
      {" " + emoji}
    </Typography>
  );
}
