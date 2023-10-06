import { Component } from "react";
import { STYLE } from "./HomePageStyle";
import { Box, Typography, Grid } from "@mui/material";

import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/statistics/Simulator.js";

import KnockOutStageView from "../molecules/KnockOutStageView";
import BigTableView from "../molecules/BigTableView";

import { SIMULATOR_MODE } from "../../nonview/statistics/SimulatorMode.js";
import React from "react";
import HomePageFooter from "../molecules/HomePageFooter";
import HomePageHeader from "../molecules/HomePageHeader";
import BigTable from "../../nonview/statistics/BigTable.js";
import VersionView from "../molecules/VersionView";
import NextMatchesView from "../molecules/NextMatchesView";

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      simulatorMode: SIMULATOR_MODE.MAXIMUM_LIKELIHOOD,
      odiStateIdx: {},
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
        <BigTableView bigTable={bigTable} />
        <NextMatchesView
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          bigTable={bigTable}
        />

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
          onClickODI={this.handleOnClickODI.bind(this)}
        />
        <GroupStageView
          simulator={simulator}
          odiStateIdx={odiStateIdx}
          onClickODI={this.handleOnClickODI.bind(this)}
        />

        <div ref={(ref) => (this.myRefBigTable = ref)}></div>

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
