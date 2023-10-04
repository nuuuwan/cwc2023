import { Typography } from "@mui/material";
import { EMOJI } from "../../nonview/constants/EMOJI.js";
import Format from "../../nonview/base/Format.js";

export default function TeamView({ team, isWinner, p }) {
  const emoji = isWinner ? EMOJI.WINNER : "";
  if (p === 1) {
    p = 0;
  }

  return (
    <Typography variant="body1">
      {team.emoji + " "}
      {team.id}{" "}
      <span style={{ fontSize: "50%" }}>{p ? Format.percent(p) : null}</span>
      {" " + emoji}
    </Typography>
  );
}
