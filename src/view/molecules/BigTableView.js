import { Box, Typography } from "@mui/material";
import { MIN_STATISTICAL_N } from "../../nonview/constants/STATISTICS.js";
import { UPDATE_DATE } from "../../nonview/constants/VERSION.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Alert,
} from "@mui/material";
import Team from "../../nonview/core/Team.js";
import TeamView from "../atoms/TeamView.js";
import Format from "../../nonview/base/Format.js";


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
        #CWC2023. Results are based on <strong>{Format.int(n)}</strong> Monte
        Carlo Simulations, as of <strong>{UPDATE_DATE}</strong>.
      </Alert>
      <TableContainer component={Box} sx={{ marginTop: 1, padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">{"Winner"}</TableCell>
              <TableCell align="right">{"Final"}</TableCell>
              <TableCell align="right">{"SF"}</TableCell>
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
                  <TableCell align="right" sx={{ fontSize: "100%" }}>
                    {Format.percent(pWinner)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "100%" }}>
                    {Format.percent(pFinalist)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "100%" }}>
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

export default function BigTableView({ n, teamIDToWinner, teamIDToFinalist, teamIDToSemiFinalist }) {
  
  return (
    <Box sx={{ margin: 1, padding: 1, maxWidth: 480 }}>
      <Typography variant="h5">#CWC2023 Probabilities</Typography>
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
