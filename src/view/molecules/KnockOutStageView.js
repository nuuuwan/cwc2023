import { Box, Typography } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";
import ODIGroupView from "./ODIGroupView.js";

export default function KnockOutStageView({
  simulator,
  odiStateIdx,
  onClickODI,
}) {
  const finalODIList = [simulator.stats.odiIdx["Final"]];
  const semiFinalsODIList = [
    simulator.stats.odiIdx["SF 1"],
    simulator.stats.odiIdx["SF 2"],
  ];

  return (
    <ScreenShot label="knock-out-stage">
      <Box>
        <Typography variant="h5">Knock-out Stage</Typography>

        <ODIGroupView
          odiList={finalODIList}
          simulator={simulator}
          onClickODI={onClickODI}
          odiStateIdx={odiStateIdx}
        />

        <ODIGroupView
          odiList={semiFinalsODIList}
          simulator={simulator}
          onClickODI={onClickODI}
          odiStateIdx={odiStateIdx}
        />
      </Box>
    </ScreenShot>
  );
}
