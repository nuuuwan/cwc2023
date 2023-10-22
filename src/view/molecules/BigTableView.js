import { Box, Typography } from "@mui/material";
import { Alert } from "@mui/material";
import Format from "../../nonview/base/Format.js";

import React from "react";
import ScreenShot from "./ScreenShot.js";
import { TEAM } from "../../nonview/core/Team.js";

import BigTableTableView from "./BigTableTableView.js";

function getTweetTeamIDToXLines(title, n, teamIDToX) {
  let lines = [title];
  for (let [teamID, nX] of Object.entries(teamIDToX)) {
    const team = TEAM[teamID];
    const line = team.twitterName + " " + Format.percentText(nX / n);
    lines.push(line);
  }
  return lines;
}

function getTweetBody(bigTable) {
  const { n, teamIDToWinner, teamIDToFinalist, teamIDToSemiFinalist } =
    bigTable.stats;

  let lines = [].concat(
    ["#CWC23 Probabilities", ""],
    getTweetTeamIDToXLines(
      "Qualifying passed Group Stage ✔️",
      n,
      teamIDToSemiFinalist
    ),
    [""],
    getTweetTeamIDToXLines("Reaching Finals 🥇🥈", n, teamIDToFinalist),
    [""],

    getTweetTeamIDToXLines("Winning 🏆", n, teamIDToWinner),
    [""]
  );
  return lines.join("\n");
}

function BigTableInfo({ bigTable }) {
  const { n } = bigTable.stats;

  return (
    <Alert severity="info" sx={{ textAlign: "left", margin: 1 }}>
      Qualifying passed the group stage, Reaching the final, and Winning the
      final in the #CWC23. Results are based on <strong>{Format.int(n)}</strong>{" "}
      Monte Carlo Simulations.
    </Alert>
  );
}

export default function BigTableView({
  bigTable,
  onClickTeam,
  setSnackbarMessage,
}) {
  const { nHorses } = bigTable.stats;
  return (
    <ScreenShot
      label="big-table"
      tweetBody={getTweetBody(bigTable)}
      setSnackbarMessage={setSnackbarMessage}
    >
      <Box>
        <Typography variant="h5">#CWC23 Probabilities</Typography>
        <Typography variant="caption">
          <span style={{ fontSize: "200%" , paddingRight: "3px"}}>
            {Format.textWithColor(
              nHorses.toFixed(1),
              Format.getPercentColor(1.0 / nHorses),
              1
            )}
          </span>
          Horse Race
        </Typography>
        <BigTableTableView bigTable={bigTable} onClickTeam={onClickTeam} />
        <BigTableInfo bigTable={bigTable} />
      </Box>
    </ScreenShot>
  );
}
