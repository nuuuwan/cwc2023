import ODIView from "./ODIView.js";
import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";

function renderGroup(entries, odiIdx, odiStateIdx) {
  const onClickODIDummy = function () {};
  return (
    <Grid container sx={{ margin: 1, padding: 1 }}>
      {entries.map(function ([id, winner], i) {
        const odi = odiIdx[id];
        return (
          <Grid key={"odi-" + i} item>
            <ODIView
              odi={odi}
              winner={winner}
              onClickODI={onClickODIDummy}
              odiState={odiStateIdx[odi.id]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default function KnockOutStageView({
  simulator,
  odiStateIdx,
  onClickODI,
}) {
  const entries = Object.entries(simulator.stats.koResultIdx);
  const final = entries.slice(2, 3);
  const semiFinals = entries.slice(0, 2);
  return (
    <ScreenShot label="knock-out-stage">
      <Box>
        <Typography variant="h5">Knock-out Stage</Typography>
        {renderGroup(final, simulator.stats.odiIdx, odiStateIdx, onClickODI)}
        {renderGroup(
          semiFinals,
          simulator.stats.odiIdx,
          odiStateIdx,
          onClickODI
        )}
      </Box>
    </ScreenShot>
  );
}
