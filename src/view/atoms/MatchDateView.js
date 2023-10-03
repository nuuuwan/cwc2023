import React from "react";
import { Typography } from "@mui/material";

export default function MatchDateView({ date }) {
  const sx = date.isWeekend ? { fontWeight: 800 } : { fontWeight: 200 };
  return (
    <Typography variant="caption" sx={sx}>
      {date.label}
    </Typography>
  );
}
