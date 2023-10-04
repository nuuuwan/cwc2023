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
import RefreshIcon from "@mui/icons-material/Refresh";
import TableRowsIcon from "@mui/icons-material/TableRows";

import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/analytics/Simulator.js";

import KnockOutStageView from "../molecules/KnockOutStageView";
import BigTableView from "../molecules/BigTableView";
import { UPDATE_DATE } from "../../nonview/constants/VERSION.js";
import { SIMULATOR_MODE } from "../../nonview/analytics/SimulatorMode.js";
import React from "react";
import Format from "../../nonview/base/Format.js";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const N_RETRY = 10_000;
export default class HomePage extends Component {
  constructor() {
    super();
    const resultIdx = null;
    const cumInvPWinner = null;
    const odiIdx = null;
    const koResultIdx = null;
    const historyList = [];
    this.state = {
      resultIdx,
      cumInvPWinner,
      odiIdx,
      koResultIdx,
      historyList,
    };

    this.myRefBigTable = React.createRef();
    this.myRefSimulation = React.createRef();
  }

  componentDidMount() {
    this.buildHistory();
    this.handleDoSimulate(SIMULATOR_MODE.MAXIMUM_LIKELIHOOD, 1);
    
  }

  buildHistory() {
    let historyList = [];
    const simulator = new Simulator(SIMULATOR_MODE.RANDOM);
    for (let i = 0; i < N_RETRY; i++) {
      const {resultIdx, cumInvPWinner} = simulator.simulateGroupStage();
      const {odiIdx, koResultIdx} = simulator.simulateKnockOutStage(resultIdx);
      historyList.push({ resultIdx, cumInvPWinner, odiIdx, koResultIdx });
    }
    this.setState({ historyList });
  }

  handleDoSimulate(simulatorMode) {
    
    
    const simulator = new Simulator(simulatorMode);
    const {resultIdx, cumInvPWinner} = simulator.simulateGroupStage();
    const {odiIdx, koResultIdx} = simulator.simulateKnockOutStage(resultIdx);

    this.setState({
      resultIdx,
      cumInvPWinner,
      odiIdx,
      koResultIdx,
      simulatorMode,
      
    },function() {
      this.myRefSimulation.scrollIntoView({ behavior: "smooth" });
    }.bind(this));
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
    const {
      resultIdx,
      cumInvPWinner,
      odiIdx,
      koResultIdx,
      simulatorMode,
      historyList,
    } = this.state;
    if (!resultIdx) {
      return <CircularProgress />;
    }

    const nMatches = 45 + 3; // TODO: Find completed matches
    const perMatchProb = Math.exp(-(Math.log(cumInvPWinner) / nMatches));
    return (
      <Box>
        <div ref={(ref) => (this.myRefSimulation = ref)}></div>
        <Typography variant="h6" color={simulatorMode.color}>
          <simulatorMode.Icon />
          <strong>{simulatorMode.message}</strong>
          <br />
        </Typography>
        <Typography variant="body1" color={simulatorMode.color}>
          {"That is " + simulatorMode.subMessage}
          <br />
          The likelihood of this exact sequence of results is about
          <br />
          <strong> 1 in {" " + Format.int(cumInvPWinner)}</strong>, or on
          average <strong>{Format.percent(perMatchProb)}</strong> per match.
          <br />
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
      this.handleDoSimulate(SIMULATOR_MODE.RANDOM);
    }.bind(this);

    const onClickMaximumLikelihood = function () {
      this.handleDoSimulate(SIMULATOR_MODE.MAXIMUM_LIKELIHOOD);
    }.bind(this);

    const onClickMinimumLikelihood = function () {
      this.handleDoSimulate(SIMULATOR_MODE.MINIMUM_LIKELIHOOD);
    }.bind(this);

    const onClickRandom = function () {
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
        <BottomNavigationAction
          icon={<ThumbUpIcon />}
          onClick={onClickMaximumLikelihood}
        />
        <BottomNavigationAction
          icon={<ThumbDownIcon />}
          onClick={onClickMinimumLikelihood}
        />
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
