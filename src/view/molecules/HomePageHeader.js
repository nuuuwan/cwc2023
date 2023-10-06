import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import AliveView from "./AliveView";
import { onClickRefresh } from "../Common.js";
import { TEAM } from "../../nonview/core/Team.js";

export default function HomePageHeader({ bigTable }) {
  const { teamIDToWinner } = bigTable.stats;
  const winner = TEAM[Object.keys(teamIDToWinner)[0]];
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
          </Typography>
          <AliveView bigTable={bigTable} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
