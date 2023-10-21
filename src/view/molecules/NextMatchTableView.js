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
import DirectionView from "../atoms/DirectionView.js";

export default function NextMatchTableView({ bigTable }) {
  const { resultToStats } = bigTable;
  const {
    teamIDToPSemiFinalist: teamIDToSemiFinalistBefore,
    teamIDToSemiFinalistRank: teamIDToSemiFinalistRankBefore,
  } = bigTable.stats;

  const labelToTeamToStat = {
    Qualify: teamIDToSemiFinalistBefore,
  };

  return (
    <Box>
      <Typography variant="subtitle1">
        Positions and Odds qualifying passed the group stage
      </Typography>

      <TableContainer component={Box}>
        <Table
          sx={{
            "& .MuiTableCell-sizeSmall": {
              padding: 0.5,
              margin: 0.5,
            },
          }}
        >
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
                    sx={{ margin: 0, padding: 0 }}
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
            <TableRow sx={{ border: "none" }}>
              <TableCell size="small" sx={{ border: "none" }}>
                <StatsTableView labelToTeamToStat={labelToTeamToStat} />
              </TableCell>
              {Object.entries(resultToStats).map(function ([resultID, stats]) {
                const {
                  teamIDToPSemiFinalist: teamIDToSemiFinalistAfter,
                  teamIDToSemiFinalistRank: teamIDToSemiFinalistRankAfter,
                } = stats;
                const labelToTeamToStat = {
                  Qualify: teamIDToSemiFinalistAfter,
                };

                const teamIDToColorOverRide = Object.fromEntries(
                  Object.entries(teamIDToSemiFinalistRankAfter).map(function ([
                    teamID,
                    positionAfter,
                  ]) {
                    const positionBefore =
                      teamIDToSemiFinalistRankBefore[teamID];
                    const diffPosition = positionAfter - positionBefore;
                    let color = "$fff1";

                    const pBefore = teamIDToSemiFinalistBefore[teamID];
                    const pAfter = teamIDToSemiFinalistAfter[teamID];
                    const dValue = pAfter - pBefore;

                    if (diffPosition !== 0 && Math.abs(dValue) > 0.01) {
                      color = diffPosition < 0 ? "#0801" : "#f001";
                    }
                    return [teamID, color];
                  })
                );

                const teamIDToStatAnnotate = Object.fromEntries(
                  Object.entries(teamIDToSemiFinalistRankAfter).map(function ([
                    teamID,
                    positionAfter,
                  ]) {
                    const positionBefore =
                      teamIDToSemiFinalistRankBefore[teamID];
                    const diffPosition = positionBefore - positionAfter;

                    const pBefore = teamIDToSemiFinalistBefore[teamID];
                    const pAfter = teamIDToSemiFinalistAfter[teamID];
                    const dValue = pAfter - pBefore;
                    const d = Math.abs(dValue) < 0.01 ? 0 : diffPosition;
                    return [teamID, <DirectionView d={d} />];
                  })
                );

                return (
                  <TableCell
                    key={"table-cell-" + resultID}
                    size="small"
                    sx={{ border: "none" }}
                  >
                    <StatsTableView
                      labelToTeamToStat={labelToTeamToStat}
                      teamIDToColorOverRide={teamIDToColorOverRide}
                      teamIDToStatAnnotate={teamIDToStatAnnotate}
                    />
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
