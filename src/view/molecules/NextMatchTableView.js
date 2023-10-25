import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { TEAM } from "../../nonview/core/Team.js";
import StatsTableView from "./StatsTableView.js";
import StyledTableCell from "../atoms/StyledTableCell.js";

export default function NextMatchTableView({ bigTable, nextODI, onClickTeam }) {
  const { odiToStats } = bigTable.odiStats;
  const { resultToStats } = odiToStats[nextODI.id];
  const { teamIDToPSemiFinalist: teamIDToSemiFinalistBefore } = bigTable.stats;

  const labelToTeamToStat = {
    Qualify: teamIDToSemiFinalistBefore,
    Diff: Object.fromEntries(
      Object.entries(teamIDToSemiFinalistBefore).map(function ([teamID, p]) {
        return [teamID, p - teamIDToSemiFinalistBefore[teamID]];
      })
    ),
  };

  const [statsTeam1, statsTeam2] = Object.values(resultToStats);
  const [team1ID, team2ID] = Object.keys(resultToStats);
  const [team1, team2] = [team1ID, team2ID].map((teamID) => TEAM[teamID]);

  const labelToTeamToStatAfter1 = {
    Qualify: statsTeam1.teamIDToPSemiFinalist,
    Diff: Object.fromEntries(
      Object.entries(statsTeam1.teamIDToPSemiFinalist).map(function ([
        teamID,
        p,
      ]) {
        return [teamID, p - teamIDToSemiFinalistBefore[teamID]];
      })
    ),
  };
  const labelToTeamToStatAfter2 = {
    Qualify: statsTeam2.teamIDToPSemiFinalist,
    Diff: Object.fromEntries(
      Object.entries(statsTeam2.teamIDToPSemiFinalist).map(function ([
        teamID,
        p,
      ]) {
        return [teamID, p - teamIDToSemiFinalistBefore[teamID]];
      })
    ),
  };
  return (
    <Box>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle1" align="center">
                  {"If " + team1.label + " wins"}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle1" align="center">
                  Before
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle1" align="center">
                  {"If " + team2.label + " wins"}
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <StyledTableCell>
                <StatsTableView
                  labelToTeamToStat={labelToTeamToStatAfter1}
                  onClickTeam={onClickTeam}
                />
              </StyledTableCell>
              <StyledTableCell>
                <StatsTableView
                  labelToTeamToStat={labelToTeamToStat}
                  onClickTeam={onClickTeam}
                />
              </StyledTableCell>
              <StyledTableCell>
                <StatsTableView
                  labelToTeamToStat={labelToTeamToStatAfter2}
                  onClickTeam={onClickTeam}
                />
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
