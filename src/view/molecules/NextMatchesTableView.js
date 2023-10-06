import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
} from "@mui/material";
import React from "react";
import BigTable from "../../nonview/statistics/BigTable.js";
import { TEAM } from "../../nonview/core/Team.js";
import TeamView from "../atoms/TeamView.js";
import Team from "../../nonview/core/Team.js";
import Format from "../../nonview/base/Format.js";
import DirectionView from "../atoms/DirectionView.js";
import { P_IS_IN_PLAY } from "../../nonview/constants/STATISTICS.js";
import { EMOJI } from "../../nonview/constants/EMOJI.js";
export default function NextMatchesTableView({ bigTable, odiList }) {
  const resultToHistoryList = BigTable.splitHistory(
    bigTable.historyList,
    odiList
  );
  const {
    orderedTeamIDs: orderedTeamIDsBefore,
    teamIDToSemiFinalist: teamIDToSemiFinalistBefore,
    n: nBefore,
  } = bigTable.stats;
  const nResults = Object.keys(resultToHistoryList).length;

  return (
    <Box>
      <Alert severity="info">
        Odds qualifying passed the group stage in the #CWC23.
      </Alert>
      <TableContainer component={Box} sx={{ marginTop: 1, padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Before</TableCell>
              <TableCell align="center" colSpan={nResults}>
                After Result
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Team</TableCell>
              <TableCell align="center"></TableCell>
              {Object.keys(resultToHistoryList).map(function (resultID) {
                const teamIDList = resultID.split(":");
                return (
                  <TableCell align="center" key={"result-" + resultID}>
                    {teamIDList.map(function (teamID) {
                      return (
                        <TeamView key={"team-" + teamID} team={TEAM[teamID]} />
                      );
                    })}
                  </TableCell>
                );
              })}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderedTeamIDsBefore.map(function (teamID, iTeam) {
              const team = new Team(teamID);
              const pSemiFinalistBefore =
                teamIDToSemiFinalistBefore[teamID] / nBefore;

              let isTeamInPlay = false;
              return (
                <TableRow key={teamID}>
                  <TableCell align="center">
                    <TeamView team={team} />
                  </TableCell>

                  <TableCell align="center">
                    {Format.percent(pSemiFinalistBefore)}
                  </TableCell>

                  {Object.entries(resultToHistoryList).map(function ([
                    resultID,
                    resultHistoryList,
                  ]) {
                    const {
                      n: nAfter,
                      teamIDToSemiFinalist: teamIDToSemiFinalistAfter,
                    } = BigTable.getStats(resultHistoryList);
                    const pSemiFinalistAfter =
                      teamIDToSemiFinalistAfter[teamID] / nAfter;
                    const dP = pSemiFinalistAfter - pSemiFinalistBefore;
                    const isResultInPlay = Math.abs(dP) > P_IS_IN_PLAY;
                    const opacity = isResultInPlay ? 1 : 0.25;
                    if (isResultInPlay) {
                      isTeamInPlay = true;
                    }

                    return (
                      <TableCell
                        align="center"
                        key={"result-" + resultID}
                        sx={{ opacity }}
                      >
                        {Format.percent(pSemiFinalistAfter)}
                        <DirectionView dP={dP} />
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <span style={{ fontSize: "150%" }}>
                      {isTeamInPlay ? EMOJI.IN_PLAY : ""}
                    </span>
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
