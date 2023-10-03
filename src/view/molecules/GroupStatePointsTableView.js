import { Box, Typography } from "@mui/material";
import GroupStatePointsTable from "../../nonview/core/GroupStatePointsTable.js";
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
const N_KNOCKOUT_TEAMS = 4;

export default function GroupStatePointsTableView({ resultIdx }) {
  const pointsTable = new GroupStatePointsTable(resultIdx);
  const teamToWins = pointsTable.getTeamToWins();
  return (
    <Box sx={{ maxWidth: 320 }}>
      <Typography variant="h4">Group Stage Points Table</Typography>

      <TableContainer component={Paper} sx={{ margin: 1, padding: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(teamToWins).map(function ([teamID, nW], iRow) {
              const points = 2 * nW;
              const team = Team.loadFromID(teamID);
              const isWinner = iRow < N_KNOCKOUT_TEAMS;
              return (
                <TableRow key={teamID}>
                  <TableCell component="th" scope="row">
                    <TeamView team={team} isWinner={isWinner} />
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: "150%" }}>
                    {points}
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
