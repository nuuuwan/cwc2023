import { Typography } from "@mui/material";
import Format from "../../nonview/base/Format.js";
import React, { useEffect, useState } from "react";

export default function DateDeltaView({ date, prefix = "" }) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10_000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Typography key={"time-" + time} variant="body2">
      {prefix}
      {Format.dateDelta(date)}
    </Typography>
  );
}
