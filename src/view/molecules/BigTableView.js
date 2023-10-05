import { Box, Typography } from "@mui/material";
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
  teamIDToTotalPosition,
}) {
  return (
    <Box>
      <Alert severity="info">
        Odds of winning, reaching the final, and reaching the semi-final in the
        #CWC2023. Results are based on <strong>{Format.int(n)}</strong> Monte
        Carlo Simulations.
      </Alert>
      <TableContainer component={Box} sx={{ marginTop: 1, padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">{"Winner"}</TableCell>
              <TableCell align="right">{"Final"}</TableCell>
              <TableCell align="right">{"SF"}</TableCell>
              <TableCell align="right">{"eRank"}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(teamIDToTotalPosition)
              .reverse()
              .map(function (teamID) {
                const team = new Team(teamID);
                const pWinner = teamIDToWinner[teamID] / n;
                const pFinalist = teamIDToFinalist[teamID] / n;
                const pSemiFinalist = teamIDToSemiFinalist[teamID] / n;
                const eRank = teamIDToTotalPosition[teamID] / n;
                return (
                  <TableRow key={teamID}>
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
                    <TableCell align="right" sx={{ fontSize: "100%" }}>
                      {Format.float(eRank)}
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

export default function BigTableView({
  n,
  teamIDToWinner,
  teamIDToFinalist,
  teamIDToSemiFinalist,
  teamIDToTotalPosition,
}) {
  return (
    <Box sx={{ margin: 1, padding: 1, maxWidth: 480 }}>
      <Typography variant="h5">#CWC2023 Probabilities</Typography>
      <BigTableInnerView
        n={n}
        teamIDToWinner={teamIDToWinner}
        teamIDToFinalist={teamIDToFinalist}
        teamIDToSemiFinalist={teamIDToSemiFinalist}
        teamIDToTotalPosition={teamIDToTotalPosition}
      />
    </Box>
  );
}
