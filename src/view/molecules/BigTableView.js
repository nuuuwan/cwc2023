import { Box, Typography } from "@mui/material";
import { MIN_STATISTICAL_N } from "../../nonview/constants/STATISTICS.js";
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
import BigTable from "../../nonview/analytics/BigTable.js";

function BigTableInnerView({
  n,
  teamIDToWinner,
  teamIDToFinalist,
  teamIDToSemiFinalist,
}) {
  return (
    <Box>
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
            {Object.entries(teamIDToWinner).map(function (
              [teamName, nWinner],
              iRow
            ) {
              const team = new Team(teamName);
              const pWinner = nWinner / n;
              const pFinalist = teamIDToFinalist[teamName] / n;
              const pSemiFinalist = teamIDToSemiFinalist[teamName] / n;
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

export default function BigTableView({ historyList }) {
  const bigTable = new BigTable(historyList);
  const { n, teamIDToWinner, teamIDToFinalist, teamIDToSemiFinalist } =
    bigTable.getTeamProbs();

  return (
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h4">#CWC2023 Probabilities (n={n})</Typography>
      {n < MIN_STATISTICAL_N ? (
        <Alert severity="warning">
          Run at least {MIN_STATISTICAL_N} simulations to generate and display
          statistics.
        </Alert>
      ) : (
        <BigTableInnerView
          n={n}
          teamIDToWinner={teamIDToWinner}
          teamIDToFinalist={teamIDToFinalist}
          teamIDToSemiFinalist={teamIDToSemiFinalist}
        />
      )}
    </Box>
  );
}
