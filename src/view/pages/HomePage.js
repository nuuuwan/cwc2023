import { Component } from "react";
import { STYLE } from "./HomePageStyle";
import { Box } from "@mui/material";

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

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      simulatorMode: SIMULATOR_MODE.MAXIMUM_LIKELIHOOD,
      odiStateIdx: {},
      pageName: PAGE.PROBABILITY.name,
    };
  }

  setSimulatorMode(simulatorMode) {
    this.setState({
      simulatorMode,
    });
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
    this.setState({
      odiStateIdx,
      simulatorMode: SIMULATOR_MODE.MAXIMUM_LIKELIHOOD,
    });
  }

  renderHeader(bigTable) {
    return <HomePageHeader bigTable={bigTable} />;
  }
  renderBody(simulatorMode, odiStateIdx, simulator, bigTable) {
    return (
      <Box>
        <ProbabilityPage bigTable={bigTable} />
        <NextMatchesPage
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          bigTable={bigTable}
          onClickODI={this.handleOnClickODI.bind(this)}
        />

        <SimulatorPage
          simulatorMode={simulatorMode}
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          onClickODI={this.handleOnClickODI.bind(this)}
        />

        <VersionView />
      </Box>
    );
  }
  renderFooter() {
    return (
      <HomePageFooter handleDoSimulate={this.setSimulatorMode.bind(this)} />
    );
  }
  render() {
    const { simulatorMode, odiStateIdx } = this.state;
    const simulator = new Simulator(simulatorMode, odiStateIdx);
    const bigTable = new BigTable(odiStateIdx);

    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>{this.renderHeader(bigTable)}</Box>
        <Box sx={STYLE.BODY}>
          {this.renderBody(simulatorMode, odiStateIdx, simulator, bigTable)}
        </Box>
        <Box sx={STYLE.FOOTER}>{this.renderFooter()}</Box>
      </Box>
    );
  }
}
