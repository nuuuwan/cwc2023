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

function BigTableInnerView({ bigTable }) {
  const {
    n,
    teamIDToWinner,
    teamIDToFinalist,
    teamIDToSemiFinalist,
    teamIDToTotalPosition,
    teamIDTo5thPctlPosition,
    teamIDTo95thPctlPosition,
  } = bigTable.stats;

  return (
    <Box>
      <Alert severity="info">
        Odds of winning, reaching the final, and reaching the semi-final in the
        #CWC2023. Results are based on <strong>{Format.int(n)}</strong> Monte
        Carlo Simulations. The Position statistic is a 90% confidence interval.
      </Alert>
      <TableContainer component={Box} sx={{ marginTop: 1, padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">{"Winner"}</TableCell>
              <TableCell align="right">{"Final"}</TableCell>
              <TableCell align="right">{"SF"}</TableCell>
              <TableCell align="right">{"Position"}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(teamIDToTotalPosition)
              .reverse()
              .map(function (teamID) {
                const team = new Team(teamID);
                const pWinner = teamIDToWinner[teamID] / n;
                const pFinalist = teamIDToFinalist[teamID] / n;
                const pSemiFinalist = teamIDToSemiFinalist[teamID] / n;
                // const eRank = teamIDToTotalPosition[teamID] / n;
                const minPosition = teamIDTo5thPctlPosition[teamID];
                const maxPosition = teamIDTo95thPctlPosition[teamID];

                let position;
                if (minPosition === maxPosition) {
                  position = minPosition;
                } else {
                  position = (
                    <span>
                      {Format.rank(minPosition)} - {Format.rank(maxPosition)}
                    </span>
                  );
                }
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
                    <TableCell align="right" sx={{ fontSize: "100%" }}>
                      {position}
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
    <Screenshottable label="big-table">
      <Box sx={{ margin: 1, padding: 1, maxWidth: 480 }}>
        <Typography variant="h5">#CWC2023 Probabilities</Typography>
        <BigTableInnerView bigTable={bigTable} />
      </Box>
    </Screenshottable>
  );
}
