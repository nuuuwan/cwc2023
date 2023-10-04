import ODIView from "./ODIView.js";
import { Grid, Box, Typography } from "@mui/material";

function renderGroup(entries, odiIdx, odiStateIdx, onClickODI) {
  return (
    <Grid container sx={{ margin: 1, padding: 1 }}>
      {entries.map(function ([id, winner], i) {
        const odi = odiIdx[id];
        return (
          <Grid key={"odi-" + i} item>
            <ODIView odi={odi} winner={winner} onClickODI={onClickODI} odiState={odiStateIdx[odi.id]} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default function KnockOutStageView({ odiIdx, koResultIdx, odiStateIdx,onClickODI }) {
  const entries = Object.entries(koResultIdx).reverse();
  const final = entries.slice(0, 1);
  const semiFinals = entries.slice(1, 3);
  return (
    <Box>
      <Typography variant="h5">Final</Typography>
      {renderGroup(final, odiIdx, odiStateIdx,onClickODI)}
      <Typography variant="h5">Semi-Finals</Typography>
      {renderGroup(semiFinals, odiIdx, odiStateIdx, onClickODI)}
    </Box>
  );
}
