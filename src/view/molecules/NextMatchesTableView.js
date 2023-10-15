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
import { EMOJI } from "../../nonview/constants/EMOJI.js";
import React from "react";
import { TEAM } from "../../nonview/core/Team.js";
import TeamView from "../atoms/TeamView.js";
import Team from "../../nonview/core/Team.js";
import Format from "../../nonview/base/Format.js";

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

export default function NextMatchesTableView({ bigTable }) {
  const { resultToStats } = bigTable;
  const {
    teamIDToSemiFinalistRank: teamIDToSemiFinalistBeforeRank,
    orderedTeamIDs,
  } = bigTable.stats;
  const nResults = Object.keys(resultToStats).length;

  return (
    <Box>
      <Typography variant="subtitle1">
        Positions and Odds qualifying passed the group stage
      </Typography>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" align="center">
                Before
              </TableCell>

              <TableCell size="small" align="center">
                Team
              </TableCell>
              <TableCell size="small" align="center" colSpan={nResults}>
                After
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="small" align="center"></TableCell>
              <TableCell size="small" align="center"></TableCell>
              {Object.keys(resultToStats).map(function (resultID) {
                const teamIDList = resultID.split(":");
                return (
                  <TableCell
                    size="small"
                    align="center"
                    key={"result-" + resultID}
                    colSpan={2}
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
            </TableRow>
          </TableHead>

          <TableBody>
            {orderedTeamIDs.map(function (teamID, iTeam) {
              const team = new Team(teamID);
              const rankBefore = teamIDToSemiFinalistBeforeRank[teamID];
              return (
                <TableRow key={teamID}>
                  <TableCell size="small" align="center">
                    <Box component="span">{Format.rank(rankBefore)}</Box>
                  </TableCell>

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
                      teamIDToSemiFinalistRank: teamIDToSemiFinalistAfterRank,
                    } = resultStats;
                    const pSemiFinalistAfter =
                      teamIDToSemiFinalistAfter[teamID] / nAfter;

                    const rankAfter = teamIDToSemiFinalistAfterRank[teamID];
                    const rankDiff = -rankAfter + rankBefore;

                    return [
                      <TableCell
                        size="small"
                        align="center"
                        key={"result-rank-" + resultID}
                      >
                        <Box component="span">
                          <RankDiff rankDiff={rankDiff} />
                          <Box component="span">
                            <span style={{ fontSize: "150%" }}>
                              {Format.rank(rankAfter)}
                            </span>
                          </Box>
                        </Box>
                      </TableCell>,
                      <TableCell
                        size="small"
                        align="center"
                        key={"result-percent-" + resultID}
                      >
                        {Format.percent(pSemiFinalistAfter)}
                      </TableCell>,
                    ];
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
