import ODIView from "./ODIView.js";
import { Grid, Box, Typography } from "@mui/material";

export default function KnockOutStageView({ odiIdx, koResultIdx }) {
  return (
    <Box>
      <Typography variant="h4">Knock-Out Stage</Typography>
      <Grid container sx={{ margin: 1, padding: 1 }}>
        {Object.entries(koResultIdx).map(function ([id, winner], i) {
          const odi = odiIdx[id];
          return (
            <Grid key={"odi-" + i} item>
              <ODIView odi={odi} winner={winner} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
