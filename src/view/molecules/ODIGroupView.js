import { Grid } from "@mui/material";
import ODIView from "./ODIView";

const SX_GRID = { margin: 1, padding: 0.5 };
export default function ODIGroupView({
  odiList,
  odiStateIdx,
  simulator,
  onClickODI,
}) {
  const onClickODIDummy = () => {};

  return (
    <Grid
      container
      sx={SX_GRID}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      {odiList.map(function (odi) {
        let winner, onClickODICustom, cursor;
        if (odi.isGroupStage) {
          winner = simulator.stats.resultIdx[odi.id];
          onClickODICustom = onClickODI;
          cursor = "pointer";
        } else {
          winner = simulator.stats.koResultIdx[odi.id];
          onClickODICustom = onClickODIDummy;
          cursor = "default";
        }

        return (
          <Grid key={"odi-" + odi.id} item sx={{ cursor }}>
            <ODIView
              odi={odi}
              winner={winner}
              onClickODI={onClickODICustom}
              odiState={odiStateIdx[odi.id]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
