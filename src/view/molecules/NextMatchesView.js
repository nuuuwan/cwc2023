import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import ScreenShot from "./ScreenShot.js";

import ODIView from "./ODIView.js";
import NextMatchesTableView from "./NextMatchesTableView.js";

const SX_GRID = { margin: 1, padding: 0.5 };

function getTweetBody(bigTable) {
  const { nextODIList } = bigTable;
  let lines = [];
  lines.push("What are the implications of ");
  lines.push(nextODIList.map((odi) => odi.twitterName).join(" & ") + "?");
  return lines.join("\n");
}

export default function NextMatchesView({
  bigTable,
  simulator,
  odiStateIdx,
  onClickODI,
}) {
  return (
    <ScreenShot label="big-table" tweetBody={getTweetBody(bigTable)}>
      <Box>
        <Typography variant="h5">#CWC23 Next Matches</Typography>

        <Grid container sx={SX_GRID}>
          {bigTable.nextODIList.map(function (odi) {
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

        <NextMatchesTableView bigTable={bigTable} />
      </Box>
    </ScreenShot>
  );
}
