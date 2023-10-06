import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";

import ODI from "../../nonview/core/ODI.js";
import ODIView from "./ODIView.js";
import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";
import NextMatchesTableView from "./NextMatchesTableView.js";

const SX_GRID = { margin: 1, padding: 0.5 };
const N_NEXT_MATCHES = 2;

function getTweetBody(bigTable, odiList) {
  let lines = [];
  lines.push("What are the implications of ");
  lines.push(odiList.map((odi) => odi.twitterName).join(" & ") + "?");
  return lines.join("\n");
}

export default function NextMatchesView({ bigTable, simulator, odiStateIdx }) {
  const onClickODI = () => {};

  const odiList = ODI.getNextMatches(GROUP_STAGE_ODI_LIST, N_NEXT_MATCHES);

  return (
    <ScreenShot label="big-table" tweetBody={getTweetBody(bigTable, odiList)}>
      <Box sx={{ margin: 1, padding: 1 }}>
        <Typography variant="h5">Next Matches</Typography>

        <Grid container sx={SX_GRID}>
          {odiList.map(function (odi) {
            return (
              <Grid key={"odi-" + odi.id} item>
                <ODIView
                  odi={odi}
                  onClickODI={onClickODI}
                  odiState={odiStateIdx[odi.id]}
                  winner={simulator.stats.resultIdx[odi.id]}
                />
              </Grid>
            );
          })}
        </Grid>

        <NextMatchesTableView bigTable={bigTable} odiList={odiList} />
      </Box>
    </ScreenShot>
  );
}
