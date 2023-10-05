import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";

import ODIView from "./ODIView.js";
import { Grid, Box, Typography, Paper } from "@mui/material";
import ODI from "../../nonview/core/ODI.js";

const SX_PAPER = { padding: 0.5, margin: 0.5 };
const SX_GRID = { margin: 0.5, padding: 0.5 };

function GroupStageWeekView({
  week,
  odiList,
  resultIdx,
  onClickODI,
  odiStateIdx,
}) {
  return (
    <Paper sx={SX_PAPER} elevation={0}>
      <Typography variant="h6">Week {week}</Typography>
      <Grid container sx={SX_GRID}>
        {odiList.map(function (odi) {
          return (
            <Grid key={"odi-" + odi.id} item>
              <ODIView
                odi={odi}
                winner={resultIdx[odi.id]}
                onClickODI={onClickODI}
                odiState={odiStateIdx[odi.id]}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

export default function GroupStageView({ resultIdx, onClickODI, odiStateIdx }) {
  return (
    <Box>
      <Typography variant="h5">Group Stage</Typography>
      {Object.entries(ODI.groupByWeek(GROUP_STAGE_ODI_LIST))
        .reverse()
        .map(function ([week, odiList]) {
          return (
            <GroupStageWeekView
              week={week}
              odiList={odiList}
              resultIdx={resultIdx}
              odiStateIdx={odiStateIdx}
              onClickODI={onClickODI}
            />
          );
        })}
    </Box>
  );
}
