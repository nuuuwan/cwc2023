import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import GroupStageView from "../molecules/GroupStageView";
import KnockOutStageView from "../molecules/KnockOutStageView";

export default class SimulatorPage extends Component {
  get name() {
    return "SimulatorPage";
  }
  render() {
    const { simulatorMode, simulator, odiStateIdx, onClickODI } = this.props;
    return (
      <Box sx={{ margin: 1, padding: 1 }}>
        <Typography variant="h5" sx={{ color: simulatorMode.color }}>
          #CWC23 {simulatorMode.message}
          <simulatorMode.Icon sx={{ marginLeft: 0.5, fontSize: "70%" }} />
        </Typography>

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
}
