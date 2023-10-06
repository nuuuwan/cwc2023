import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";

import ODI from "../../nonview/core/ODI.js";
import ODIView from "./ODIView.js";
import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";

const SX_GRID = { margin: 1, padding: 0.5 };
const N_MEXT_MATCHES = 3;

function getTweetBody(bigTable) {
  return "";
}

export default function NextMatchesView({ bigTable, simulator, odiStateIdx }) {
  const onClickODI = () => {};

  const odiList = ODI.getNextMatches(GROUP_STAGE_ODI_LIST, N_MEXT_MATCHES);

  return (
    <ScreenShot label="big-table" tweetBody={getTweetBody(bigTable)}>
      <Box sx={{ margin: 1, padding: 1, maxWidth: 480 }}>
        <Typography variant="h5">Next Matches</Typography>

        <Grid container sx={SX_GRID}>
          {odiList.map(function (odi) {
            return (
              <Grid key={"odi-" + odi.id} item>
                <ODIView
                  odi={odi}
                  winner={simulator.stats.resultIdx[odi.id]}
                  onClickODI={onClickODI}
                  odiState={odiStateIdx[odi.id]}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ScreenShot>
  );
}
