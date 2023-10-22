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
import Format from "../../nonview/base/Format.js";

export default function NextMatchTableView({ bigTable, onClickTeam, nextODI }) {
  const { odiToStats } = bigTable.odiStats;
  const { resultToStats, maxAbsSwing } = odiToStats[nextODI.id];
  const { teamIDToPSemiFinalist: teamIDToSemiFinalistBefore } = bigTable.stats;

  const labelToTeamToStat = {
    Qualify: teamIDToSemiFinalistBefore,
  };

  return (
    <Box>
      <Typography variant="caption">
        <span style={{ fontSize: "200%" }}>
          {Format.percentWithColorOverride(maxAbsSwing, -maxAbsSwing + 0.05)}
        </span>
        {" max swing in odds to qualify"}
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
                <StatsTableView
                  labelToTeamToStat={labelToTeamToStat}
                  onClickTeam={onClickTeam}
                />
              </TableCell>
              {Object.entries(resultToStats).map(function ([resultID, stats]) {
                const { teamIDToPSemiFinalist: teamIDToSemiFinalistAfter } =
                  stats;
                const labelToTeamToStat = {
                  Qualify: teamIDToSemiFinalistAfter,
                };

                let teamIDToColorOverRide = {};

                for (const [teamID, pAfter] of Object.entries(
                  teamIDToSemiFinalistAfter
                )) {
                  const pBefore = teamIDToSemiFinalistBefore[teamID];
                  const dValue = pAfter - pBefore;
                  const color = dValue > 0 ? "green" : "red";
                  teamIDToColorOverRide[teamID] = color;
                }

                return (
                  <TableCell
                    key={"table-cell-" + resultID}
                    size="small"
                    sx={{ border: "none" }}
                  >
                    <StatsTableView
                      labelToTeamToStat={labelToTeamToStat}
                      onClickTeam={onClickTeam}
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
