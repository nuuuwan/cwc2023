import { Component } from "react";
import { STYLE } from "./HomePageStyle";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RefreshIcon from "@mui/icons-material/Refresh";
import TableRowsIcon from "@mui/icons-material/TableRows";

import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/analytics/Simulator.js";

import KnockOutStageView from "../molecules/KnockOutStageView";
import BigTableView from "../molecules/BigTableView";
import { UPDATE_DATE } from "../../nonview/constants/VERSION.js";
import { SimulatorMode } from "../../nonview/analytics/Simulator.js";
import React from "react";

const N_RETRY = 10_000;
export default class HomePage extends Component {
  constructor() {
    super();
    const resultIdx = null;
    const odiIdx = null;
    const koResultIdx = null;
    const historyList = [];
    this.state = {
      resultIdx,
      odiIdx,
      koResultIdx,
      historyList,
    };

    this.myRefBigTable = React.createRef();
  }

  componentDidMount() {
    this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD, 1);
  }

  handleOnClickDice(simulatorMode, nIncr) {
    let { historyList } = this.state;
    const simulator = new Simulator(simulatorMode);

    let resultIdx, odiIdx, koResultIdx;
    for (let i = 0; i < nIncr; i++) {
      resultIdx = simulator.simulateGroupStage();
      const koResult = simulator.simulateKnockOutStage(resultIdx);
      odiIdx = koResult.odiIdx;
      koResultIdx = koResult.koResultIdx;

      if (simulatorMode === SimulatorMode.RANDOM) {
        historyList.push({ resultIdx, odiIdx, koResultIdx });
      }
    }

    this.setState({
      resultIdx,
      odiIdx,
      koResultIdx,
      historyList,
    });
  }

  renderHeader() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              #CWC2023Simulator
              <span className="superscript">{UPDATE_DATE}</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  renderBody() {
    const { resultIdx, odiIdx, koResultIdx, simulatorMode, historyList } =
      this.state;
    if (!resultIdx) {
      return <CircularProgress />;
    }

    let message, subMessage, Icon, color;
    if (simulatorMode === SimulatorMode.RANDOM) {
      message = "Random Outcome.";
      subMessage =
        "If the outcome of each match is probabilistically selected according to past data.";
      Icon = CasinoIcon;
      color = "#f80";
    } else {
      message = "Most likely Outcome.";
      subMessage = "If every match is won by the favourite.";
      Icon = PsychologyIcon;
      color = "#080";
    }

    return (
      <Box>
        <Typography variant="h6" color={color}>
          <Icon />
          <strong>{message}</strong> {" " + subMessage}
        </Typography>

        <KnockOutStageView odiIdx={odiIdx} koResultIdx={koResultIdx} />
        <GroupStageView resultIdx={resultIdx} />

        <div ref={(ref) => (this.myRefBigTable = ref)}></div>
        <BigTableView historyList={historyList} />
      </Box>
    );
  }
  renderFooter() {
    const onClickRandomOne = function () {
      this.handleOnClickDice(SimulatorMode.RANDOM, 1);
    }.bind(this);

    const onClickML = function () {
      this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD, 1);
    }.bind(this);

    const onClickRandom = function () {
      this.handleOnClickDice(SimulatorMode.RANDOM, N_RETRY);
      this.myRefBigTable.scrollIntoView({ behavior: "smooth" });
    }.bind(this);

    const onClickRefresh = function () {
      window.location.reload();
    };

    return (
      <BottomNavigation>
        <BottomNavigationAction
          icon={<RefreshIcon />}
          onClick={onClickRefresh}
        />
        <BottomNavigationAction
          icon={<TableRowsIcon />}
          onClick={onClickRandom}
        />
        <BottomNavigationAction icon={<PsychologyIcon />} onClick={onClickML} />
        <BottomNavigationAction
          icon={<CasinoIcon />}
          onClick={onClickRandomOne}
        />
      </BottomNavigation>
    );
  }
  render() {
    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>{this.renderHeader()}</Box>
        <Box sx={STYLE.BODY}>{this.renderBody()}</Box>
        <Box sx={STYLE.FOOTER}>{this.renderFooter()}</Box>
      </Box>
    );
  }
}
