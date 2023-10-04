import { Component } from "react";
import { STYLE } from "./HomePageStyle";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";

import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/analytics/Simulator.js";

import KnockOutStageView from "../molecules/KnockOutStageView";
import BigTableView from "../molecules/BigTableView";

import { SIMULATOR_MODE } from "../../nonview/analytics/SimulatorMode.js";
import React from "react";
import Format from "../../nonview/base/Format.js";
import { N_MONTE_CARLO_SIMULATIONS } from "../../nonview/constants/STATISTICS.js";
import HomePageFooter from "../molecules/HomePageFooter";
import HomePageHeader from "../molecules/HomePageHeader";
import BigTable from "../../nonview/analytics/BigTable.js";

export default class HomePage extends Component {
  constructor() {
    super();
    const resultIdx = null;
    const cumInvPWinner = null;
    const odiIdx = null;
    const koResultIdx = null;
    const odiStateIdx = {};
    this.state = {
      resultIdx,
      cumInvPWinner,
      odiIdx,
      koResultIdx,
      odiStateIdx,
    };

    this.myRefBigTable = React.createRef();
    this.myRefSimulation = React.createRef();
  }

  componentDidMount() {
    this.handleDoSimulate(SIMULATOR_MODE.MAXIMUM_LIKELIHOOD, 1);
  }

  buildHistory() {
    const { odiStateIdx } = this.state;
    let historyList = [];
    const simulator = new Simulator(SIMULATOR_MODE.RANDOM, odiStateIdx);
    for (let i = 0; i < N_MONTE_CARLO_SIMULATIONS; i++) {
      const { resultIdx, cumInvPWinner } = simulator.simulateGroupStage();
      const { odiIdx, koResultIdx } =
        simulator.simulateKnockOutStage(resultIdx);
      historyList.push({ resultIdx, cumInvPWinner, odiIdx, koResultIdx });
    }
    return historyList;
  }

  handleDoSimulate(simulatorMode) {
    const { odiStateIdx } = this.state;
    const simulator = new Simulator(simulatorMode, odiStateIdx);
    const { resultIdx, cumInvPWinner } = simulator.simulateGroupStage();
    const { odiIdx, koResultIdx } = simulator.simulateKnockOutStage(resultIdx);

    this.setState(
      {
        resultIdx,
        cumInvPWinner,
        odiIdx,
        koResultIdx,
        simulatorMode,
      },
      function () {
        this.myRefSimulation.scrollIntoView({ behavior: "smooth" });
      }.bind(this)
    );
  }

  handleOnClickODI(odi) {
    let { odiStateIdx } = this.state;
    if (!odiStateIdx[odi.id]) {
      odiStateIdx[odi.id] = 1;
    } else if (odiStateIdx[odi.id] === 1) {
      odiStateIdx[odi.id] = 2;
    } else {
      odiStateIdx[odi.id] = 0;
    }
    this.setState({ odiStateIdx });
  }

  renderHeader(n, teamIDToSemiFinalist) {
    return <HomePageHeader n={n} teamIDToSemiFinalist={teamIDToSemiFinalist} />;
  }
  renderBody(
    resultIdx,
    cumInvPWinner,
    odiIdx,
    koResultIdx,
    simulatorMode,
    odiStateIdx,

    perMatchProb,
    n,
    teamIDToWinner,
    teamIDToFinalist,
    teamIDToSemiFinalist
  ) {
    return (
      <Box color={simulatorMode.color}>
        <div ref={(ref) => (this.myRefSimulation = ref)}></div>

        <Grid container direction="row" alignItems="center">
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
          The likelihood of this exact sequence of results is about
          <strong> 1 in {" " + Format.int(cumInvPWinner)}</strong>, or on
          average <strong>{Format.percent(perMatchProb)}</strong> per match.
        </Typography>

        <KnockOutStageView
          odiIdx={odiIdx}
          koResultIdx={koResultIdx}
          odiStateIdx={odiStateIdx}
          onClickODI={this.handleOnClickODI.bind(this)}
        />
        <GroupStageView
          resultIdx={resultIdx}
          odiStateIdx={odiStateIdx}
          onClickODI={this.handleOnClickODI.bind(this)}
        />

        <div ref={(ref) => (this.myRefBigTable = ref)}></div>
        <BigTableView
          n={n}
          teamIDToWinner={teamIDToWinner}
          teamIDToFinalist={teamIDToFinalist}
          teamIDToSemiFinalist={teamIDToSemiFinalist}
        />
      </Box>
    );
  }
  renderFooter() {
    return (
      <HomePageFooter
        myRefBigTable={this.myRefBigTable}
        handleDoSimulate={this.handleDoSimulate.bind(this)}
      />
    );
  }
  render() {
    const {
      resultIdx,
      cumInvPWinner,
      odiIdx,
      koResultIdx,
      simulatorMode,
      odiStateIdx,
    } = this.state;
    if (!resultIdx) {
      return <CircularProgress />;
    }

    const nMatches = 45 + 3; // TODO: Find completed matches
    const perMatchProb = Math.exp(-(Math.log(cumInvPWinner) / nMatches));

    const historyList = this.buildHistory();
    const bigTable = new BigTable(historyList);
    const { n, teamIDToWinner, teamIDToFinalist, teamIDToSemiFinalist } =
      bigTable.getTeamProbs();

    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>
          {this.renderHeader(n, teamIDToSemiFinalist)}
        </Box>
        <Box sx={STYLE.BODY}>
          {this.renderBody(
            resultIdx,
            cumInvPWinner,
            odiIdx,
            koResultIdx,
            simulatorMode,
            odiStateIdx,
            perMatchProb,
            n,
            teamIDToWinner,
            teamIDToFinalist,
            teamIDToSemiFinalist
          )}
        </Box>
        <Box sx={STYLE.FOOTER}>{this.renderFooter()}</Box>
      </Box>
    );
  }
}
