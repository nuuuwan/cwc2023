import { Box, Typography } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Alert,
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
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h4">#CWC2023 Probabilities (n={n})</Typography>
      <Alert severity="info">
        Odds of winning, reaching the final, and reaching the semi-final in the
        #CWC2023. Results are based on <strong>{n}</strong> Monte Carlo
        Simulations. 99% confidence intervals are shown.
      </Alert>
      <TableContainer component={Paper} sx={{ margin: 1, padding: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">{"p(Winner)"}</TableCell>
              <TableCell align="right">{"p(Final)"}</TableCell>
              <TableCell align="right">{"p(SF)"}</TableCell>
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
                    {Format.binomial(pWinner, n)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "150%" }}>
                    {Format.binomial(pFinalist, n)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "150%" }}>
                    {Format.binomial(pSemiFinalist, n)}
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
