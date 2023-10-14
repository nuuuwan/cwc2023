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

export default function BigTableTableView({ bigTable, onClickTeam }) {
  const {
    n,
    teamIDToWinner,
    teamIDToFinalist,
    teamIDToSemiFinalist,
    orderedTeamIDs,
  } = bigTable.stats;
  console.debug(bigTable.stats);

  let pSemiFinalistPrev = null;
  let iPack = 0;
  return (
    <Box>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" align="center"></TableCell>
              <TableCell size="small" align="center">
                Team
              </TableCell>
              <TableCell size="small" align="center">
                {"Qualify"}
              </TableCell>
              <TableCell size="small" align="center">
                {"Final"}
              </TableCell>

              <TableCell size="small" align="center">
                {"Winner"}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderedTeamIDs.map(function (teamID, iTeam) {
              const team = new Team(teamID);
              const pWinner = teamIDToWinner[teamID] / n;
              const pFinalist = teamIDToFinalist[teamID] / n;
              const pSemiFinalist = teamIDToSemiFinalist[teamID] / n;

              const ratio = pSemiFinalistPrev / pSemiFinalist;
              pSemiFinalistPrev = pSemiFinalist;
              if (ratio > PACK_RATIO && pSemiFinalistPrev > MIN_P_FOR_PACK) {
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
                  >
                    {Format.rank(iTeam + 1)}
                  </TableCell>
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

                  <TableCell
                    size="small"
                    align="center"
                    sx={{ fontSize: "100%" }}
                  >
                    {Format.percentWithIcon(pSemiFinalist)}
                  </TableCell>

                  <TableCell
                    size="small"
                    align="center"
                    sx={{ fontSize: "100%" }}
                  >
                    {Format.percentWithIcon(pFinalist)}
                  </TableCell>

                  <TableCell
                    size="small"
                    align="center"
                    sx={{ fontSize: "100%" }}
                  >
                    {Format.percentWithIcon(pWinner)}
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
