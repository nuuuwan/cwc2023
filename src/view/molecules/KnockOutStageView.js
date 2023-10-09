import { Box, Typography } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";
import ODIGroupView from "./ODIGroupView.js";

export default function KnockOutStageView({
  simulator,
  odiStateIdx,
  onClickODI,
  setSnackbarMessage,
}) {
  const finalODIList = [simulator.stats.odiIdx["Final"]];
  const semiFinalsODIList = [
    simulator.stats.odiIdx["SF 1"],
    simulator.stats.odiIdx["SF 2"],
  ];

  return (
    <ScreenShot label="knock-out-stage" setSnackbarMessage={setSnackbarMessage}>
      <Box>
        <Typography variant="h5">Knock-out Stage</Typography>

        <ODIGroupView
          odiList={finalODIList}
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          showWinner={true}
        />

        <ODIGroupView
          odiList={semiFinalsODIList}
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          showWinner={true}
        />
      </Box>
    </ScreenShot>
  );
}
