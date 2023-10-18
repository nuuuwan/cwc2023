import React from "react";
import { Typography } from "@mui/material";
import Format from "../../nonview/base/Format.js";

export default function MatchDateView({ date }) {
  return (
    <Typography variant="body2" sx={{ fontSize: "60%" }}>
      {Format.matchDate(date)}
    </Typography>
  );
}
