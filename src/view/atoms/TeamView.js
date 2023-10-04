import { Box, Typography } from "@mui/material";
import { EMOJI } from "../../nonview/core/EMOJI.js";
import Format from "../../nonview/base/Format.js";

export default function TeamView({ team, isWinner, p }) {
  const emoji = isWinner ? EMOJI.WINNER : "";

  const pStr = p ? " " + Format.percent(p) : "";

  return (
    <Box
      sx={{
        background: team.color + "08",
        borderRadius: 3,
        padding: 1,
        margin: 0.5,
      }}
    >
      <Typography variant="h6">
        {team.emoji + " "}
        {team.id}
        <span style={{ fontSize: "80%" }}>{pStr}</span>
        {" " + emoji}
      </Typography>
    </Box>
  );
}
