import { Box } from "@mui/material";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import Team from "../../nonview/core/Team.js";
import TeamView from "../atoms/TeamView.js";
import Format from "../../nonview/base/Format.js";

import React from "react";
import StyledTableCell from "../atoms/StyledTableCell.js";

export default function StatsTableView({ labelToTeamToStat, onClickTeam }) {
  const firstLabel = Object.keys(labelToTeamToStat)[0];
  const orderedTeamIDs = Object.keys(labelToTeamToStat[firstLabel]);

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer component={Box}>
        <Table>
          <TableBody>
            <TableRow>
              <StyledTableCell size="small" align="center"></StyledTableCell>
              {Object.keys(labelToTeamToStat).map(function (label) {
                return (
                  <StyledTableCell
                    key={"header-" + label}
                    size="small"
                    align="center"
                  >
                    {Format.getLabel(label)}
                  </StyledTableCell>
                );
              })}
            </TableRow>

            {orderedTeamIDs.map(function (teamID, iTeam) {
              const team = new Team(teamID);
              const onClickInner = function () {
                onClickTeam(team);
              };

              const borderTop = iTeam !== 4 ? "none" : "2px dashed #8888";

              return (
                <TableRow key={teamID}>
                  <StyledTableCell
                    onClick={onClickInner}
                    size="small"
                    sx={{
                      borderTop,
                    }}
                  >
                    <TeamView team={team} />
                  </StyledTableCell>
                  {Object.entries(labelToTeamToStat).map(function ([
                    label,
                    teamToStat,
                  ]) {
                    const stat = teamToStat[teamID];
                    return (
                      <StyledTableCell
                        key={"stat-" + label + "-" + teamID}
                        size="small"
                        align="center"
                        sx={{
                          fontSize: Format.getFontSize(label),
                          borderTop,
                          color: Format.getColor(label, stat),
                        }}
                      >
                        {Format.getText(label, stat)}
                      </StyledTableCell>
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
