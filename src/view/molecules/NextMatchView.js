import { Box, Typography } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";
import ODIGroupView from "./ODIGroupView.js";
import NextMatchTableViewSVG from "./NextMatchTableViewSVG.js";
import DateDeltaView from "../atoms/DateDeltaView.js";
import DateX from "../../nonview/base/DateX.js";

function getTweetBody(nextODI) {
  const nextODIList = [nextODI];
  let lines = [];
  lines.push("What are the implications of ");
  lines.push(nextODIList.map((odi) => odi.twitterName).join(" & ") + "?");
  return lines.join("\n");
}

export default function NextMatchView({
  bigTable,
  simulator,
  odiStateIdx,
  setSnackbarMessage,
  onClickTeam,
  nextODI,
}) {
  const date = nextODI.date;
  const prefix = "Start" + (new DateX(date).dut > 0 ? "s" : "ed") + " ";

  return (
    <ScreenShot
      label="next-matches"
      tweetBody={getTweetBody(nextODI)}
      setSnackbarMessage={setSnackbarMessage}
    >
      <Box>
        <Typography variant="subtitle1">
          <DateDeltaView date={date} prefix={prefix} />
        </Typography>

        <ODIGroupView
          odiList={[nextODI]}
          simulator={simulator}
          odiStateIdx={odiStateIdx}
        />

        <NextMatchTableViewSVG
          bigTable={bigTable}
          onClickTeam={onClickTeam}
          nextODI={nextODI}
        />
      </Box>
    </ScreenShot>
  );
}
