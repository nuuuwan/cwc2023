import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import React from "react";
import { TEAM } from "../../nonview/core/Team.js";
import TeamView from "../atoms/TeamView.js";
import StatsTableView from "./StatsTableView.js";

export default function NextMatchesTableView({ bigTable }) {
  const { resultToStats } = bigTable;
  const { teamIDToPSemiFinalist: teamIDToSemiFinalistBefore } = bigTable.stats;

  const labelToTeamToStat = {
    Qualify: teamIDToSemiFinalistBefore,
  };

  return (
    <Box>
      <Typography variant="subtitle1">
        Positions and Odds qualifying passed the group stage
      </Typography>

      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" size="small">
                Before
              </TableCell>
              {Object.keys(resultToStats).map(function (resultID) {
                return (
                  <TableCell
                    key={"header-" + resultID}
                    align="center"
                    size="small"
                  >
                    If
                    <TeamView team={TEAM[resultID]} />
                    Win
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell size="small">
                <StatsTableView labelToTeamToStat={labelToTeamToStat} />
              </TableCell>
              {Object.entries(resultToStats).map(function ([resultID, stats]) {
                const { teamIDToPSemiFinalist: teamIDToSemiFinalistAfter } =
                  stats;
                const labelToTeamToStat = {
                  Qualify: teamIDToSemiFinalistAfter,
                };
                return (
                  <TableCell key={"table-cell-" + resultID} size="small">
                    <StatsTableView labelToTeamToStat={labelToTeamToStat} />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
