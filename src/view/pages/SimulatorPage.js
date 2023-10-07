import React, { Component } from "react";
import { Box, Typography, Alert } from "@mui/material";
import GroupStageView from "../molecules/GroupStageView";
import KnockOutStageView from "../molecules/KnockOutStageView";
import CasinoIcon from "@mui/icons-material/Casino";
import Format from "../../nonview/base/Format";
import { N_MONTE_CARLO_SIMULATIONS } from "../../nonview/constants/STATISTICS";

export default class SimulatorPage extends Component {
  static name = "SimulatorPage";
  static Icon = CasinoIcon;
  render() {
    const { simulatorMode, simulator, odiStateIdx, onClickODI, bigTable } =
      this.props;
    const { sumLogPWinner } = simulator.stats;
    const invPWinner = Math.exp(-sumLogPWinner);
    const logStr = `1 in ${Format.int(invPWinner)}`;
    const rank = bigTable.getOutcomeRank(simulator);
    const pRank = rank / N_MONTE_CARLO_SIMULATIONS;

    const renderedRank = (
      <Typography variant="body1">
        More likely than {Format.percent(1 - pRank)} of outcomes.
      </Typography>
    );

    const color = Format.getPercentColor(1 - pRank);

    return (
      <Box>
        <Typography variant="h5" sx={{ color: simulatorMode.color }}>
          #CWC23 {simulatorMode.message}
          <simulatorMode.Icon sx={{ marginLeft: 0.5, fontSize: "70%" }} />
        </Typography>

        <Typography variant="subtitle1">
          {simulatorMode.subMessage + " "}
        </Typography>

        <Alert severity="info" sx={{ textAlign: "left", margin: 1 }}>
          The odds of this sequence of outcomes happening is{" "}
          <span style={{ color }}>{logStr}</span>.{renderedRank}
        </Alert>

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
