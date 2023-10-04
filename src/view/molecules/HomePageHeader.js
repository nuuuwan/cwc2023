import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import AliveView from "./AliveView";

export default function HomePageHeader({ n, teamIDToSemiFinalist }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            #CWC2023
          </Typography>
          <AliveView n={n} teamIDToSemiFinalist={teamIDToSemiFinalist} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
