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
  const { n, teamToWinner } = bigTable.getTeamProbs();

  return (
    <Box sx={{ maxWidth: 320 }}>
      <Typography variant="h5">Big Table (n={n})</Typography>

      <TableContainer component={Paper} sx={{ margin: 1, padding: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">{"p(Winner)"}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(teamToWinner).map(function (
              [teamName, nWinner],
              iRow
            ) {
              const team = new Team(teamName);
              const pWinner = nWinner / n;
              return (
                <TableRow key={teamName}>
                  <TableCell component="th" scope="row">
                    <TeamView team={team} />
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "200%" }}>
                    {Format.percent(pWinner)}
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
