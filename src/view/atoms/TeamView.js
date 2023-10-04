import { Box, Typography } from "@mui/material";
import { EMOJI } from "../../nonview/constants/EMOJI.js";
import Format from "../../nonview/base/Format.js";

export default function TeamView({ team, isWinner, p }) {
  const emoji = isWinner ? EMOJI.WINNER : "";

  const pStr = p ? " " + Format.percent(p) : "";

  return (
    <Box>
      <Typography variant="body1">
        {team.emoji + " "}
        {team.id}
        <span style={{ fontSize: "67%" }}>{pStr}</span>
        {" " + emoji}
      </Typography>
    </Box>
  );
}
