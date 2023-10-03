import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";

import ODIView from "./ODIView.js";
import { Grid, Box, Typography } from "@mui/material";

export default function GroupStageView({ resultIdx }) {
  return (
    <Box>
      <Typography variant="h6">Group Stage</Typography>
      <Grid container sx={{ margin: 1, padding: 1 }}>
        {GROUP_STAGE_ODI_LIST.map(function (odi, i) {
          return (
            <Grid key={"odi-" + i} item>
              <ODIView odi={odi} winner={resultIdx[odi.id]} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
