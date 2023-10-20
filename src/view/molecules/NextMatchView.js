import { Box, Typography } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";
import ODIGroupView from "./ODIGroupView.js";
import NextMatchTableView from "./NextMatchTableView.js";
import DateDeltaView from "../atoms/DateDeltaView.js";

function getTweetBody(bigTable) {
  const { nextODIList } = bigTable;
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
}) {
  return (
    <ScreenShot
      label="next-matches"
      tweetBody={getTweetBody(bigTable)}
      setSnackbarMessage={setSnackbarMessage}
    >
      <Box>
        <Typography variant="h5">#CWC23 - Next Match</Typography>
        <Typography variant="subtitle1">
          <DateDeltaView date={bigTable.nextODIList[0].date} />
        </Typography>

        <ODIGroupView
          odiList={bigTable.nextODIList}
          simulator={simulator}
          odiStateIdx={odiStateIdx}
        />

        <NextMatchTableView bigTable={bigTable} />
      </Box>
    </ScreenShot>
  );
}
