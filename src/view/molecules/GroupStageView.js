import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";

import ODIView from "./ODIView.js";
import { Grid, Box, Typography, Paper } from "@mui/material";
import ODI from "../../nonview/core/ODI.js";
import Screenshottable from "../molecules/Screenshottable.js";
import { EMOJI } from "../../nonview/constants/EMOJI.js";
const SX_PAPER = { padding: 0.5, margin: 0.5 };
const SX_GRID = { margin: 0.5, padding: 0.5 };

function getTweetContent(week, odiList) {
  let lines = [`Week ${week} - Predictions`, ""];
  for (let odi of odiList.slice().reverse()) {
    const line = `${odi.favoriteTeam.twitterName} ${EMOJI.WINNER} - ${odi.underdogTeam.twitterName}`;
    lines.push(line);
  }
  lines.push("");

  return lines.join("\n");
}

function GroupStageWeekView({
  week,
  odiList,
  simulator,
  onClickODI,
  odiStateIdx,
}) {
  return (
    <Screenshottable
      label={`group-state-week-${week}`}
      tweetContent={getTweetContent(week, odiList)}
    >
      <Paper sx={SX_PAPER} elevation={0}>
        <Typography variant="h6">Week {week}</Typography>
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
      </Paper>
    </Screenshottable>
  );
}

export default function GroupStageView({ simulator, onClickODI, odiStateIdx }) {
  return (
    <Box>
      <Typography variant="h5">Group Stage</Typography>
      {Object.entries(ODI.groupByWeek(GROUP_STAGE_ODI_LIST))
        .reverse()
        .map(function ([week, odiList]) {
          return (
            <GroupStageWeekView
              key={"week-" + week}
              week={week}
              odiList={odiList}
              simulator={simulator}
              odiStateIdx={odiStateIdx}
              onClickODI={onClickODI}
            />
          );
        })}
    </Box>
  );
}
