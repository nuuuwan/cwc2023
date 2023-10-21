import React, { Component } from "react";
import { Box, Typography, Alert, IconButton } from "@mui/material";
import GroupStageView from "../molecules/GroupStageView";
import KnockOutStageView from "../molecules/KnockOutStageView";
import CasinoIcon from "@mui/icons-material/Casino";
import Format from "../../nonview/base/Format";
import { N_MONTE_CARLO_SIMULATIONS } from "../../nonview/constants/STATISTICS";
import { SIMULATOR_MODE } from "../../nonview/statistics/SimulatorMode";
import TodayIcon from "@mui/icons-material/Today";

const COLOR_MAJOR_UPSET = Format.getPercentColor(0.2);
const COLOR_MINOR_UPSET = Format.getPercentColor(0.4);

export default class SimulatorPage extends Component {
  static name = "SimulatorPage";
  static Icon = CasinoIcon;

  constructor(props) {
    super(props);
    this.refCurrentWeek = React.createRef();
  }

  setRefCurrentWeek(ref) {
    this.refCurrentWeek = ref;
  }

  handleOnClickCurrentWeek() {
    this.refCurrentWeek.scrollIntoView({ behavior: "smooth" });
  }

  renderMenu() {
    const { setSimulatorModeID, simulatorModeID } = this.props;
    const currentWeekButton = (
      <IconButton onClick={this.handleOnClickCurrentWeek.bind(this)}>
        <TodayIcon />
      </IconButton>
    );

    const simulatorModeButtonList = Object.values(SIMULATOR_MODE).map(function (
      simulatorMode
    ) {
      const onClick = function () {
        setSimulatorModeID(simulatorMode.id);
      };

      const Icon = simulatorMode.Icon;
      const isActive = simulatorModeID === simulatorMode.id;
      const iconColor = isActive ? simulatorMode.color : "#ccc";

      return (
        <IconButton
          key={"simulatorModeButton-" + simulatorMode.id}
          onClick={onClick}
        >
          <Icon sx={{ color: iconColor }} />
        </IconButton>
      );
    });

    return (
      <Box>
        {currentWeekButton}
        {simulatorModeButtonList}
      </Box>
    );
  }

  render() {
    const {
      simulatorModeID,
      simulator,
      odiStateIdx,
      onClickODI,
      bigTable,
      setSnackbarMessage,
    } = this.props;
    const simulatorMode = SIMULATOR_MODE[simulatorModeID];

    const { sumLogPWinner, nMajorUpsets, nUpsets } = simulator.stats;
    const invPWinner = Math.exp(-sumLogPWinner);
    const logStr = `1 in ${Format.int(invPWinner)}`;
    const rank = bigTable.getOutcomeRank(simulator);
    const pRank = rank / N_MONTE_CARLO_SIMULATIONS;
    const color = Format.getPercentColor(1 - pRank);

    return (
      <Box>
        <Typography variant="h5" sx={{ color: simulatorMode.color }}>
          #CWC23 {simulatorMode.message}
          <simulatorMode.Icon sx={{ marginLeft: 0.5, fontSize: "70%" }} />
          {this.renderMenu()}
        </Typography>

        <Typography variant="subtitle1">
          {simulatorMode.subMessage + " "}
        </Typography>

        <Alert severity="info" sx={{ textAlign: "left", margin: 1 }}>
          The probability of this exact sequence of outcomes is{" "}
          <span style={{ color }}>{logStr}</span>. More likely than{" "}
          {Format.percent(1 - pRank)} of possible sequences. Includes{" "}
          <span style={{ color: COLOR_MAJOR_UPSET }}>{nMajorUpsets} Major</span>{" "}
          and <span style={{ color: COLOR_MINOR_UPSET }}>{nUpsets} Other</span>{" "}
          Upsets.
        </Alert>

        <GroupStageView
          isConcluded={false}
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          onClickODI={onClickODI}
          setSnackbarMessage={setSnackbarMessage}
          setRefCurrentWeek={this.setRefCurrentWeek.bind(this)}
        />

        <KnockOutStageView
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          onClickODI={onClickODI}
          setSnackbarMessage={setSnackbarMessage}
        />

        <GroupStageView
          isConcluded={true}
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          onClickODI={onClickODI}
          setSnackbarMessage={setSnackbarMessage}
          setRefCurrentWeek={this.setRefCurrentWeek.bind(this)}
        />
      </Box>
    );
  }
}
