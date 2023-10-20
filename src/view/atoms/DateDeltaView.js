import { Typography } from "@mui/material";
import Format from "../../nonview/base/Format.js";
import React, { useEffect, useState } from "react";

export default function DateDeltaView({ date }) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Typography key={"time-" + time} variant="body2">
      {Format.dateDelta(date)}
    </Typography>
  );
}
