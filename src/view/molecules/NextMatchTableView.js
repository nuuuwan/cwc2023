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
import { EMOJI } from "../../nonview/constants/EMOJI.js";

function RankDiff({ rankDiff }) {
  if (rankDiff === 0) {
    return null;
  }
  const emoji = rankDiff > 0 ? EMOJI.UP : EMOJI.DOWN;
  const n = Math.abs(rankDiff);
  const color = rankDiff > 0 ? "green" : "red";
  return (
    <Box component="span" sx={{ color, marginRight: 1 }}>
      {emoji}
      {n > 1 ? n : ""}
    </Box>
  );
}

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
                    if (diffPosition !== 0) {
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
                    return [teamID, <RankDiff rankDiff={diffPosition} />];
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
