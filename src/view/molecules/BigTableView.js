import { Box, Typography } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import Team from "../../nonview/core/Team.js";
import TeamView from "../atoms/TeamView.js";
import Format from "../../nonview/base/Format.js";
import BigTable from "../../nonview/core/BigTable.js";

export default function BigTableView({ historyList }) {
  const bigTable = new BigTable(historyList);
  const { n, teamToWinner, teamToFinalist, teamToSemiFinalist } =
    bigTable.getTeamProbs();

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h4">Big Table (n={n})</Typography>

      <TableContainer component={Paper} sx={{ margin: 1, padding: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">{"p(Winner)"}</TableCell>
              <TableCell align="right">{"p(Finalist)"}</TableCell>
              <TableCell align="right">{"p(S-Finalist)"}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(teamToWinner).map(function (
              [teamName, nWinner],
              iRow
            ) {
              const team = new Team(teamName);
              const pWinner = nWinner / n;
              const pFinalist = teamToFinalist[teamName] / n;
              const pSemiFinalist = teamToSemiFinalist[teamName] / n;
              return (
                <TableRow key={teamName}>
                  <TableCell component="th" scope="row">
                    <TeamView team={team} />
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "150%" }}>
                    {Format.percent(pWinner)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "150%" }}>
                    {Format.percent(pFinalist)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "150%" }}>
                    {Format.percent(pSemiFinalist)}
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
