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
import { EMOJI } from "../../nonview/core/EMOJI.js";

const N_KNOCKOUT_TEAMS = 4;
const N_GROUP_STAGE_TEAMS = 10;

export default function GroupStatePointsTableView({ resultIdx }) {
  const pointsTable = new GroupStatePointsTable(resultIdx);
  const teamToWins = pointsTable.getTeamToWins();
  return (
    <Box>
      <Typography variant="h4">Group Stage Points Table</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(teamToWins).map(function ([teamID, nW], iRow) {
              const nP = N_GROUP_STAGE_TEAMS - 1;
              const nL = nP - nW;
              const points = 2 * nW;
              const team = Team.loadFromID(teamID);
              const check = iRow < N_KNOCKOUT_TEAMS ? EMOJI.WINNER : "";
              return (
                <TableRow
                  key={teamID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {team.label}
                    {" " + check}
                  </TableCell>

                  <TableCell align="right">{nP}</TableCell>
                  <TableCell align="right">{nW}</TableCell>
                  <TableCell align="right">{nL}</TableCell>
                  <TableCell align="right">{points}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
