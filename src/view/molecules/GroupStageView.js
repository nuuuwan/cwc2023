import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";
import Simulator from "../../nonview/core/Simulator.js";
import ODIView from "./ODIView.js";
import { Grid } from "@mui/material";

export default function GroupStageView() {
  const randomResultIdx = new Simulator().getRandomResultIdx();
  return (
    <Grid container sx={{ margin: 1, padding: 1 }}>
      {GROUP_STAGE_ODI_LIST.map(function (odi, i) {
        return (
          <Grid key={"odi-" + i} item>
            <ODIView odi={odi} winner={randomResultIdx[odi.id]} />
          </Grid>
        );
      })}
    </Grid>
  );
}
