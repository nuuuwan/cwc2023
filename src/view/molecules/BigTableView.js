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
import Screenshottable from "./Screenshottable.js";
import { TEAM } from "../../nonview/core/Team.js";
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
    getTweetTeamIDToXLines("🥇Probability of Winning🏆", n, teamIDToWinner),
    ["..."],
    getTweetTeamIDToXLines(
      "🥇🥈Probability of Reaching Finals",
      n,
      teamIDToFinalist
    ),
    ["..."],
    getTweetTeamIDToXLines(
      "✔️Probability of Qualifying passed Group Stage",
      n,
      teamIDToSemiFinalist
    )
  );
  return lines.join("\n");
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
      <Alert severity="info">
        Odds of winning, reaching the final, and reaching the semi-final in the
        #CWC23. Results are based on <strong>{Format.int(n)}</strong> Monte
        Carlo Simulations.
      </Alert>
      <TableContainer component={Box} sx={{ marginTop: 1, padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">{"Winner"}</TableCell>
              <TableCell align="right">{"Final"}</TableCell>
              <TableCell align="right">{"SF"}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderedTeamIDs.map(function (teamID) {
              const team = new Team(teamID);
              const pWinner = teamIDToWinner[teamID] / n;
              const pFinalist = teamIDToFinalist[teamID] / n;
              const pSemiFinalist = teamIDToSemiFinalist[teamID] / n;

              return (
                <TableRow key={teamID}>
                  <TableCell component="th" scope="row">
                    <TeamView team={team} />
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "100%" }}>
                    {Format.percent(pWinner)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "100%" }}>
                    {Format.percent(pFinalist)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "100%" }}>
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
    <Screenshottable label="big-table" tweetBody={getTweetBody(bigTable)}>
      <Box sx={{ margin: 1, padding: 1, maxWidth: 480 }}>
        <Typography variant="h5">#CWC23 Probabilities</Typography>
        <BigTableInnerView bigTable={bigTable} />
      </Box>
    </Screenshottable>
  );
}
