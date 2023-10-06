import { Box, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Alert,
} from "@mui/material";
import Team from "../../nonview/core/Team.js";
import TeamView from "../atoms/TeamView.js";
import Format from "../../nonview/base/Format.js";

import React from "react";
import ScreenShot from "./ScreenShot.js";
import { TEAM } from "../../nonview/core/Team.js";
import { TEAM_ID_TO_P_WINNER_START } from "../../nonview/constants/TEAM_ID_TO_P_WINNER_START.js";
import DirectionView from "../atoms/DirectionView.js";

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
    <Alert severity="info" sx={{ margin: 1 }}>
      Odds of winning, reaching the final, and qualifying passed the group stage
      in the #CWC23. Results are based on <strong>{Format.int(n)}</strong> Monte
      Carlo Simulations.
      <br />
      <br />
      <DirectionView dP={-1} />
      <DirectionView dP={1} /> indicate each team's progress since the start of
      the tournament.
    </Alert>
  );
}

function BigTableInnerView({ bigTable }) {
  const {
    n,
    teamIDToWinner,
    teamIDToFinalist,
    teamIDToSemiFinalist,
    orderedTeamIDs,
  } = bigTable.stats;

  return (
    <Box>
      <TableContainer component={Box} sx={{ marginTop: 1, padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Team</TableCell>
              <TableCell align="center">{"Winner"}</TableCell>
              <TableCell align="center">{"Final"}</TableCell>
              <TableCell align="center">{"Qualify"}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderedTeamIDs.map(function (teamID, iTeam) {
              const team = new Team(teamID);
              const pWinner = teamIDToWinner[teamID] / n;
              const pFinalist = teamIDToFinalist[teamID] / n;
              const pSemiFinalist = teamIDToSemiFinalist[teamID] / n;

              const pWinnerStart = TEAM_ID_TO_P_WINNER_START[teamID];
              const dPWinner = pWinner - pWinnerStart;

              return (
                <TableRow key={teamID}>
                  <TableCell align="center" component="th" scope="row">
                    {Format.rank(iTeam + 1)}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <TeamView team={team} />
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "100%" }}>
                    {Format.percent(pWinner)}
                    <DirectionView dP={dPWinner} />
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "100%" }}>
                    {Format.percent(pFinalist)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "100%" }}>
                    {Format.percent(pSemiFinalist)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default function BigTableView({ bigTable }) {
  return (
    <ScreenShot label="big-table" tweetBody={getTweetBody(bigTable)}>
      <Box>
        <Typography variant="h5">#CWC23 Probabilities</Typography>
        <BigTableInnerView bigTable={bigTable} />
        <BigTableInfo bigTable={bigTable} />
      </Box>
    </ScreenShot>
  );
}
