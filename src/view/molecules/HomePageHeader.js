import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { UPDATE_DATE } from "../../nonview/constants/VERSION.js";

export default function HomePageHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            #CWC2023Simulator
            <span className="superscript">Updated {UPDATE_DATE}</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
