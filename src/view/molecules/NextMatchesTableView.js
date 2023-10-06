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

export default function NextMatchesTableView({ bigTable, odiList }) {
  const resultToHistoryList = BigTable.splitHistory(
    bigTable.historyList,
    odiList
  );
  const { orderedTeamIDs: orderedTeamIDsBefore, teamIDToSemiFinalist: teamIDToSemiFinalistBefore, n: nBefore } = bigTable.stats;
  const nResults = Object.keys(resultToHistoryList).length;

  return (
    <Box>

<Alert severity="info">
        Odds qualifying passed the group
        stage in the #CWC23. 
      </Alert>
      <TableContainer component={Box} sx={{ marginTop: 1, padding: 0 }}>
        <Table>

        <TableHead>
    
            <TableRow>
            <TableCell align="center"></TableCell>
              <TableCell align="center">Before</TableCell>
              <TableCell align="center" colSpan={nResults}>After Result</TableCell>
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
            </TableRow>
          </TableHead>

          <TableBody>
            {orderedTeamIDsBefore.map(function (teamID, iTeam) {
              const team = new Team(teamID);
              const pSemiFinalistBefore = teamIDToSemiFinalistBefore[teamID] / nBefore;

              return (
                <TableRow key={teamID}>
                  <TableCell align="center" component="th" scope="row">
                    <TeamView team={team} />
                  </TableCell>

                  <TableCell align="center" component="th" scope="row">
                  {Format.percent(pSemiFinalistBefore)}
                  </TableCell>

                  {Object.entries(resultToHistoryList).map(function ([
                    resultID,
                    resultHistoryList,
                  ]) {
                    const {n: nAfter, teamIDToSemiFinalist: teamIDToSemiFinalistAfter} = BigTable.getStats(resultHistoryList);
                    const pSemiFinalistAfter = teamIDToSemiFinalistAfter[teamID] / nAfter;
                    const dP = pSemiFinalistAfter - pSemiFinalistBefore;
                    const opacity = Math.abs(dP) > 0.095 ? 1 : 0.25;
                
                    
                    return (
                      <TableCell align="center" key={"result-" + resultID} sx={{opacity}}>
                        {Format.percent(pSemiFinalistAfter)}
                        <DirectionView dP={dP} />
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
