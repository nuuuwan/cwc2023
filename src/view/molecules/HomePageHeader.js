import { Badge, Box, AppBar, Toolbar, Typography } from "@mui/material";
import AliveView from "./AliveView";
import { onClickRefresh } from "../Common.js";
import { TEAM } from "../../nonview/core/Team.js";
import LockIcon from "@mui/icons-material/Lock";
export default function HomePageHeader({ bigTable, odiStateIdx }) {
  const { teamIDToWinner } = bigTable.stats;
  const winner = TEAM[Object.keys(teamIDToWinner)[0]];
  const nLocks = Object.keys(odiStateIdx).length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: winner.color }}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={onClickRefresh}
          >
            #CWC23
            {nLocks > 0 ? (
              <Badge badgeContent={nLocks} color="primary">
                <LockIcon color="#fff" />
              </Badge>
            ) : null}
          </Typography>

          <AliveView bigTable={bigTable} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
