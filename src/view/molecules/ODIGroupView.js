import { Grid } from "@mui/material";
import ODIView from "./ODIView";

const SX_GRID = { margin: 1, padding: 0.5 };
export default function ODIGroupView({
  odiList,
  odiStateIdx,
  simulator,
  onClickODI,
  showWinner,
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
        if (onClickODI) {
          onClickODICustom = onClickODI;
          cursor = "pointer";
        } else {
          onClickODICustom = onClickODIDummy;
          cursor = "default";
        }

        winner =
          simulator.stats.resultIdx[odi.id] ||
          simulator.stats.koResultIdx[odi.id];

        return (
          <Grid key={"odi-" + odi.id} item sx={{ cursor }}>
            <ODIView
              odi={odi}
              winner={showWinner ? winner : null}
              onClickODI={onClickODICustom}
              odiState={odiStateIdx[odi.id]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
