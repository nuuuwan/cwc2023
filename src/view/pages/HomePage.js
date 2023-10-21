import { Component } from "react";
import { STYLE } from "./HomePageStyle";
import { Box, CircularProgress, Snackbar } from "@mui/material";

import Simulator from "../../nonview/statistics/Simulator.js";

import SimulatorPage from "./SimulatorPage";
import NextMatchesPage from "./NextMatchesPage";
import { SIMULATOR_MODE } from "../../nonview/statistics/SimulatorMode.js";
import React from "react";
import HomePageFooter from "../molecules/HomePageFooter";
import HomePageHeader from "../molecules/HomePageHeader";
import BigTable from "../../nonview/statistics/BigTable.js";
import VersionView from "../molecules/VersionView";
import ProbabilityPage from "./ProbabilityPage";
import { PAGE } from "./PAGE.js";
import URLContext from "../../nonview/base/URLContext";

export default class HomePage extends Component {
  constructor() {
    super();

    const odiStateIdx = {};
    const selectedTeam = null;

    let context = URLContext.getContext();
    const simulatorModeID =
      context.simulatorModeID || SIMULATOR_MODE.MAXIMUM_LIKELIHOOD.id;
    const pageName = context.pageName || PAGE.PROBABILITY.name;

    context = { pageName, simulatorModeID };
    URLContext.setContext(context);

    const isSnackbarOpen = false;
    const snackbarMessage = "";

    const simulator = null;
    const bigTable = null;

    this.state = {
      simulatorModeID,
      odiStateIdx,
      pageName,
      selectedTeam,
      isSnackbarOpen,
      snackbarMessage,
      simulator,
      bigTable,
    };
  }

  componentDidMount() {
    const { simulatorModeID, odiStateIdx } = this.state;

    const simulator = new Simulator(
      SIMULATOR_MODE[simulatorModeID],
      odiStateIdx
    );
    const bigTable = new BigTable(odiStateIdx);
    this.setState({
      simulator,
      bigTable,
    });
  }

  setSimulatorModeID(simulatorModeID) {
    const simulator = new Simulator(
      SIMULATOR_MODE[simulatorModeID],
      this.state.odiStateIdx
    );
    const pageName = PAGE.SIMULATOR.name;

    const context = { pageName, simulatorModeID };
    URLContext.setContext(context);

    this.setState({
      pageName,
      simulatorModeID,
      simulator,
    });
  }

  setSnackbarClosed() {
    this.setState({
      isSnackbarOpen: false,
    });
  }

  setSnackbarMessage(snackbarMessage) {
    this.setState({
      snackbarMessage,
      isSnackbarOpen: true,
    });
  }

  handleOnClickODI(odi) {
    let { simulatorModeID, odiStateIdx } = this.state;

    if (!odiStateIdx[odi.id]) {
      odiStateIdx[odi.id] = 1;
    } else if (odiStateIdx[odi.id] === 1) {
      odiStateIdx[odi.id] = 2;
    } else {
      delete odiStateIdx[odi.id];
    }

    const bigTable = new BigTable(odiStateIdx);
    const simulator = new Simulator(
      SIMULATOR_MODE[simulatorModeID],
      odiStateIdx
    );

    this.setState({
      odiStateIdx,
      simulator,
      bigTable,
    });
  }

  handleOnClickTeam(team) {
    const { bigTable } = this.state;
    const simulator = bigTable.getMostProbableTeamWin(team);
    const pageName = PAGE.SIMULATOR.name;

    const context = { pageName };
    URLContext.setContext(context);

    this.setState({
      simulatorModeID: SIMULATOR_MODE.RANDOM.id,
      pageName,
      selectedTeam: team,
      simulator,
    });
  }

  setPageName(pageName) {
    const { simulatorModeID } = this.state;
    const context = { pageName, simulatorModeID };
    URLContext.setContext(context);

    this.setState({
      pageName,
    });
  }

  renderHeader() {
    const { bigTable, odiStateIdx } = this.state;
    return <HomePageHeader bigTable={bigTable} odiStateIdx={odiStateIdx} />;
  }

  renderBody() {
    const { simulatorModeID, odiStateIdx, simulator, bigTable } = this.state;
    if (!bigTable) {
      return <CircularProgress />;
    }

    switch (this.state.pageName) {
      case PAGE.PROBABILITY.name:
        return (
          <ProbabilityPage
            bigTable={bigTable}
            onClickTeam={this.handleOnClickTeam.bind(this)}
            setSnackbarMessage={this.setSnackbarMessage.bind(this)}
          />
        );
      case PAGE.NEXT_MATCHES.name:
        return (
          <NextMatchesPage
            simulator={simulator}
            odiStateIdx={odiStateIdx}
            bigTable={bigTable}
            onClickODI={this.handleOnClickODI.bind(this)}
            onClickTeam={this.handleOnClickTeam.bind(this)}
            setSnackbarMessage={this.setSnackbarMessage.bind(this)}
          />
        );
      case PAGE.SIMULATOR.name:
        return (
          <SimulatorPage
            simulatorModeID={simulatorModeID}
            setSimulatorModeID={this.setSimulatorModeID.bind(this)}
            simulator={simulator}
            odiStateIdx={odiStateIdx}
            onClickODI={this.handleOnClickODI.bind(this)}
            bigTable={bigTable}
            setSnackbarMessage={this.setSnackbarMessage.bind(this)}
          />
        );
      default:
        throw new Error("Unknown page name: " + this.state.pageName);
    }
  }

  renderFooter() {
    const { pageName } = this.state;
    return (
      <HomePageFooter
        handleSetPageName={this.setPageName.bind(this)}
        pageName={pageName}
      />
    );
  }
  render() {
    const { isSnackbarOpen, snackbarMessage } = this.state;

    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>{this.renderHeader()}</Box>
        <Box sx={STYLE.BODY}>
          <Box sx={STYLE.BODY_INNER}>
            {this.renderBody()}
            <VersionView />
          </Box>
        </Box>
        <Box sx={STYLE.FOOTER}>{this.renderFooter()}</Box>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={1000}
          onClose={this.setSnackbarClosed.bind(this)}
          message={snackbarMessage}
        />
      </Box>
    );
  }
}
