import { Typography, Box } from "@mui/material";
import ScreenShot from "./ScreenShot.js";
import { EMOJI } from "../../nonview/constants/EMOJI.js";
import ODIGroupView from "./ODIGroupView.js";
import React from "react";

const SX_PAPER = { padding: 1, margin: 0.5 };
function getTweetBody(week, odiList) {
  let lines = [`Week ${week} - Predictions`];
  for (let odi of odiList.slice()) {
    const line = `${odi.favoriteTeam.twitterName} ${EMOJI.WINNER} - ${odi.underdogTeam.twitterName}`;
    lines.push(line);
  }

  return lines.join("\n");
}

export default function GroupStageWeekView({
  week,
  odiList,
  simulator,
  onClickODI,
  odiStateIdx,
  setSnackbarMessage,
}) {
  return (
    <div>
      <ScreenShot
        label={`group-state-week-${week}`}
        tweetBody={getTweetBody(week, odiList)}
        setSnackbarMessage={setSnackbarMessage}
      >
        <Box sx={SX_PAPER}>
          <Typography variant="h6">Week {week}</Typography>
          <ODIGroupView
            odiList={odiList}
            simulator={simulator}
            onClickODI={onClickODI}
            odiStateIdx={odiStateIdx}
            showWinner={true}
          />
        </Box>
      </ScreenShot>
    </div>
  );
}
