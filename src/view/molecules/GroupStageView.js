import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";

import ODIView from "./ODIView.js";
import { Grid, Box, Typography } from "@mui/material";

export default function GroupStageView({ resultIdx }) {
  let inner = [];
  let iItem = 0;
  for (let odi of GROUP_STAGE_ODI_LIST) {
    inner.push(
      <Grid key={"odi-" + odi.id} item>
        <ODIView odi={odi} winner={resultIdx[odi.id]} />
      </Grid>
    );
    iItem++;
    if (odi.date.getDay() === 1) {
      inner.push(<Box key={"box-" + iItem} width="100%" />);
      iItem++;
    }
  }

  return (
    <Box>
      <Typography variant="h5">Group Stage</Typography>
      <Grid container sx={{ margin: 1, padding: 1 }}>
        {inner}
      </Grid>
    </Box>
  );
}
