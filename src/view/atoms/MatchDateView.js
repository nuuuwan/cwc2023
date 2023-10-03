import React from "react";
import { Typography } from "@mui/material";
import Format from "../../nonview/base/Format.js";

export default function MatchDateView({ matchDate }) {
  const sx = matchDate.isWeekend ? { fontWeight: 800 } : { fontWeight: 200 };
  return (
    <Typography variant="body2" sx={sx}>
      {Format.matchDate(matchDate.date)}
    </Typography>
  );
}
