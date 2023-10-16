import { Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import Team from "../../nonview/core/Team.js";
import TeamView from "../atoms/TeamView.js";
import Format from "../../nonview/base/Format.js";
import {
  PACK_RATIO,
  MIN_P_FOR_PACK,
} from "../../nonview/constants/STATISTICS.js";

import { COLOR_GRAY_LIST } from "../../nonview/base/Format.js";

import React from "react";

export default function StatsTableView({ labelToTeamToStat, onClickTeam }) {
  const firstLabel = Object.keys(labelToTeamToStat)[0];
  let prevFirstStat = null;
  let iPack = 0;

  const orderedTeamIDs = Object.keys(labelToTeamToStat[firstLabel]);

  return (
    <Box>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" align="center">
                Team
              </TableCell>
              {Object.keys(labelToTeamToStat).map(function (label) {
                return (
                  <TableCell
                    key={"header-" + label}
                    size="small"
                    align="center"
                  >
                    {label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {orderedTeamIDs.map(function (teamID, iTeam) {
              const team = new Team(teamID);
              const firstStat = labelToTeamToStat[firstLabel][teamID];
              const ratio = prevFirstStat / firstStat;
              prevFirstStat = firstStat;
              if (ratio > PACK_RATIO && prevFirstStat > MIN_P_FOR_PACK) {
                iPack += 1;
              }
              const background = COLOR_GRAY_LIST[iPack];

              const onClickInner = function () {
                onClickTeam(team);
              };

              return (
                <TableRow key={teamID} sx={{ background }}>
                  <TableCell
                    size="small"
                    align="center"
                    component="th"
                    scope="row"
                    onClick={onClickInner}
                    sx={{ cursor: "pointer" }}
                  >
                    <TeamView team={team} />
                  </TableCell>
                  {Object.entries(labelToTeamToStat).map(function ([
                    label,
                    teamToStat,
                  ]) {
                    const stat = teamToStat[teamID];
                    return (
                      <TableCell
                        key={"stat-" + label + "-" + teamID}
                        size="small"
                        align="center"
                        sx={{ fontSize: "100%" }}
                      >
                        {Format.percent(stat)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
