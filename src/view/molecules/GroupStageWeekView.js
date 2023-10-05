import ODIView from "./ODIView.js";
import { Grid, Typography, Box } from "@mui/material";
import ScreenShottable from "./ScreenShottable.js";
import { EMOJI } from "../../nonview/constants/EMOJI.js";
const SX_PAPER = { padding: 1, margin: 0.5 };
const SX_GRID = { margin: 1, padding: 0.5 };

function getTweetBody(week, odiList) {
  let lines = [`Week ${week} - Predictions`];
  for (let odi of odiList.slice().reverse()) {
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
}) {
  return (
    <ScreenShottable
      label={`group-state-week-${week}`}
      tweetBody={getTweetBody(week, odiList)}
    >
      <Box sx={SX_PAPER}>
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
      </Box>
    </ScreenShottable>
  );
}
