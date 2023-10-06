import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import AliveView from "./AliveView";
import { onClickRefresh } from "../Common.js";
export default function HomePageHeader({ bigTable }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
