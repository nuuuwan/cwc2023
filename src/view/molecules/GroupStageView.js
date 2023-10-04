import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";

import ODIView from "./ODIView.js";
import { Grid, Box, Typography, Paper } from "@mui/material";
const SX_PAPER = { padding: 1, margin: 2, background: "#ccc1" };
export default function GroupStageView({ resultIdx }) {
  let inner = [];
  let iItem = 0;
  let currentInner = [];
  let week = 6;
  for (let odi of GROUP_STAGE_ODI_LIST) {
    iItem++;

    currentInner.push(
      <Grid key={"odi-" + odi.id} item>
        <ODIView odi={odi} winner={resultIdx[odi.id]} />
      </Grid>
    );

    if (odi.date.getDay() === 1) {
      inner.push(
        <Paper key={"paper-" + iItem} sx={SX_PAPER} elevation={0}>
          <Typography variant="h6">Week {week}</Typography>
          <Grid container spacing={1}>
            {currentInner}
          </Grid>
        </Paper>
      );
      currentInner = [];
      week--;
    }
  }
  if (currentInner.length > 0) {
    inner.push(
      <Paper key={"grid-" + iItem} sx={SX_PAPER} elevation={0}>
        <Typography variant="h6">Week {week}</Typography>
        <Grid container spacing={1}>
          {currentInner}
        </Grid>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h5">Group Stage</Typography>
      {inner}
    </Box>
  );
}
