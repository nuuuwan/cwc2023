import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import GroupStageView from "../molecules/GroupStageView";
import KnockOutStageView from "../molecules/KnockOutStageView";
import CasinoIcon from "@mui/icons-material/Casino";
import Format from "../../nonview/base/Format";

export default class SimulatorPage extends Component {
  static name = "SimulatorPage";
  static Icon = CasinoIcon;
  render() {
    const { simulatorMode, simulator, odiStateIdx, onClickODI } = this.props;
    const { sumLogPWinner } = simulator.stats;
    const invPWinner = Math.exp(-sumLogPWinner);
    const logStr = `1 in ${Format.int(invPWinner)}`;

    return (
      <Box>
        <Typography variant="h5" sx={{ color: simulatorMode.color }}>
          #CWC23 {simulatorMode.message}
          <simulatorMode.Icon sx={{ marginLeft: 0.5, fontSize: "70%" }} />
        </Typography>

        <Typography variant="body1" color={simulatorMode.color}>
          {"That is " + simulatorMode.subMessage + " "}
        </Typography>

        <Typography variant="body1" color={simulatorMode.color}>
          {logStr}
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
