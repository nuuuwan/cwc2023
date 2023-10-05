import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import AliveView from "./AliveView";

export default function HomePageHeader({ bigTable }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            #CWC23
          </Typography>
          <AliveView bigTable={bigTable} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
