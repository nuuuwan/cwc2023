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
import { SimulatorMode } from "../../nonview/analytics/Simulator.js";
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
  }

  componentDidMount() {
    this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD, 1);
  }

  handleOnClickDice(simulatorMode, nIncr) {
    let { historyList } = this.state;
    const simulator = new Simulator(simulatorMode);

    let resultIdx, cumInvPWinner, odiIdx, koResultIdx;
    for (let i = 0; i < nIncr; i++) {
      const gResult = simulator.simulateGroupStage();
      resultIdx = gResult.resultIdx;
      cumInvPWinner = gResult.cumInvPWinner;

      const koResult = simulator.simulateKnockOutStage(resultIdx);
      odiIdx = koResult.odiIdx;
      koResultIdx = koResult.koResultIdx;

      if (simulatorMode === SimulatorMode.RANDOM) {
        historyList.push({ resultIdx, cumInvPWinner, odiIdx, koResultIdx });
      }
    }

    this.setState({
      resultIdx,
      cumInvPWinner,
      odiIdx,
      koResultIdx,
      historyList,
      simulatorMode,
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

    let message, subMessage, Icon, color;

    switch (simulatorMode) {
      case SimulatorMode.RANDOM:
        message = "Random Outcome. ";
        subMessage =
          "That is, if the outcome of each match is randomly selected based on passed outcomes. ";
        Icon = CasinoIcon;
        color = "#f80";
        break;
      case SimulatorMode.MAXIMUM_LIKELIHOOD:
        message = "Most likely Outcome. ";
        subMessage = "That is, if every match is won by the favourite. ";
        Icon = ThumbUpIcon;
        color = "#080";
        break;
      case SimulatorMode.MINIMUM_LIKELIHOOD:
        message = "Least likely Outcome. ";
        subMessage = "That is, if every match is won by the underdog. ";
        Icon = ThumbDownIcon;
        color = "#f00";
        break;
      default:
        throw new Error(`Invalid mode: ${simulatorMode}`);
    }
    const nMatches = 45 + 3; // TODO: Find completed matches
    const perMatchProb = Math.exp(-(Math.log(cumInvPWinner) / nMatches))
    return (
      <Box>
        <Typography variant="h6" color={color}>
          <Icon />
          <strong>{message}</strong>
          <br />
          {subMessage}
          <br />
          The likelihood of this exact sequence of results is about
          <strong> 1 in {" " + Format.int(cumInvPWinner)}</strong>,
          or on average <strong>{Format.percent(perMatchProb)}</strong> per match.
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

    const onClickMaximumLikelihood = function () {
      this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD, 1);
    }.bind(this);

    const onClickMinimumLikelihood = function () {
      this.handleOnClickDice(SimulatorMode.MINIMUM_LIKELIHOOD, 1);
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
