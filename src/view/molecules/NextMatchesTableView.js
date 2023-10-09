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
import Team from "../../nonview/core/Team.js";
import Format from "../../nonview/base/Format.js";
export default function NextMatchesTableView({ bigTable }) {
  const { resultToStats, teamIDToSwing } = bigTable;
  const nResults = Object.keys(resultToStats).length;

  return (
    <Box>
      <Typography variant="subtitle1">
        Odds qualifying passed the group stage
      </Typography>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" align="center"></TableCell>
              <TableCell size="small" align="center" colSpan={nResults}>
                After Result
              </TableCell>
              <TableCell size="small" align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="small" align="center">
                Team
              </TableCell>
              {Object.keys(resultToStats).map(function (resultID) {
                const teamIDList = resultID.split(":");
                return (
                  <TableCell
                    size="small"
                    align="center"
                    key={"result-" + resultID}
                  >
                    {teamIDList.map(function (teamID) {
                      return (
                        <Box key={"team-" + teamID}>
                          <TeamView team={TEAM[teamID]} />
                          win
                        </Box>
                      );
                    })}
                  </TableCell>
                );
              })}
              <TableCell size="small" align="center">
                Swing
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(teamIDToSwing).map(function (
              [teamID, swing],
              iTeam
            ) {
              const team = new Team(teamID);

              return (
                <TableRow key={teamID}>
                  <TableCell size="small" align="center">
                    <TeamView team={team} />
                  </TableCell>

                  {Object.entries(resultToStats).map(function ([
                    resultID,
                    resultStats,
                  ]) {
                    const {
                      n: nAfter,
                      teamIDToSemiFinalist: teamIDToSemiFinalistAfter,
                    } = resultStats;
                    const pSemiFinalistAfter =
                      teamIDToSemiFinalistAfter[teamID] / nAfter;

                    return (
                      <TableCell
                        size="small"
                        align="center"
                        key={"result-" + resultID}
                      >
                        {Format.percent(pSemiFinalistAfter)}
                      </TableCell>
                    );
                  })}
                  <TableCell size="small" align="center">
                    <span style={{ fontSize: "150%" }}>
                      {Format.percentWithColorOverride(swing, swing)}
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
