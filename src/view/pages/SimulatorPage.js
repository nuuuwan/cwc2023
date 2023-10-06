import { Grid, Box, Typography } from "@mui/material";
import GroupStageView from "../molecules/GroupStageView";
import KnockOutStageView from "../molecules/KnockOutStageView";

export default function SimulatorPage({
  simulatorMode,
  simulator,
  odiStateIdx,
  onClickODI,
}) {
  return (
    <Box>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ color: simulatorMode.color }}
      >
        <Grid item>
          <simulatorMode.Icon />
        </Grid>
        <Grid item>
          <Typography variant="h5">
            <strong>{simulatorMode.message}</strong>
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="body1" color={simulatorMode.color}>
        {"That is " + simulatorMode.subMessage + " "}
      </Typography>

      <KnockOutStageView
        simulator={simulator}
        odiStateIdx={odiStateIdx}
        onClickODI={onClickODI}
      />
      <GroupStageView
        simulator={simulator}
        odiStateIdx={odiStateIdx}
        onClickODI={onClickODI}
      />
    </Box>
  );
}
