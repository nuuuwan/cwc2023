import { Box, Typography } from "@mui/material";
import { Alert } from "@mui/material";
import Format from "../../nonview/base/Format.js";

import React from "react";
import ScreenShot from "./ScreenShot.js";
import { TEAM } from "../../nonview/core/Team.js";
import DirectionView from "../atoms/DirectionView.js";

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
    ["#CWC2023 Probabilities", ""],
    getTweetTeamIDToXLines("Winning 🏆", n, teamIDToWinner),
    [""],
    getTweetTeamIDToXLines("Reaching Finals 🥇🥈", n, teamIDToFinalist),
    [""],
    getTweetTeamIDToXLines(
      "Qualifying passed Group Stage ✔️",
      n,
      teamIDToSemiFinalist
    )
  );
  return lines.join("\n");
}

function BigTableInfo({ bigTable }) {
  const { n } = bigTable.stats;

  return (
    <Alert severity="info" sx={{ textAlign: "left", margin: 1 }}>
      Odds of winning, reaching the final, and qualifying passed the group stage
      in the #CWC23. Results are based on <strong>{Format.int(n)}</strong> Monte
      Carlo Simulations. <DirectionView dP={-1} />
      <DirectionView dP={1} /> indicate each team's progress since the start of
      the tournament.
    </Alert>
  );
}

export default function BigTableView({ bigTable, onClickTeam }) {
  return (
    <ScreenShot label="big-table" tweetBody={getTweetBody(bigTable)}>
      <Box>
        <Typography variant="h5">#CWC23 Probabilities</Typography>
        <BigTableTableView bigTable={bigTable} onClickTeam={onClickTeam} />
        <BigTableInfo bigTable={bigTable} />
      </Box>
    </ScreenShot>
  );
}
