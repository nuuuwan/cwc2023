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
import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/core/Simulator.js";
import GroupStatePointsTableView from "../molecules/GroupStatePointsTableView";
import KnockOutStageView from "../molecules/KnockOutStageView";
import BigTableView from "../molecules/BigTableView";
import { UPDATE_DATE } from "../../nonview/core/VERSION.js";
import { SimulatorMode } from "../../nonview/core/Simulator.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const N_RETRY = 20;
export default class HomePage extends Component {
  constructor() {
    super();
    const resultIdx = null;
    const odiIdx = null;
    const koResultIdx = null;
    const simulatorMode = null;
    const nRefreshes = null;
    const historyList = [];
    this.state = {
      resultIdx,
      odiIdx,
      koResultIdx,
      simulatorMode,
      nRefreshes,
      historyList,
    };
  }

  componentDidMount() {
    this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD, 0);
  }

  handleOnClickDice(simulatorMode, nRefreshes, isWaitForSriLanka) {
    let { historyList } = this.state;
    const simulator = new Simulator(simulatorMode);
    const resultIdx = simulator.simulateGroupStage();
    const { odiIdx, koResultIdx } = simulator.simulateKnockOutStage(resultIdx);
    if (simulatorMode === SimulatorMode.RANDOM) {
      historyList.push({ resultIdx, odiIdx, koResultIdx });
    }
    this.setState(
      {
        resultIdx,
        odiIdx,
        koResultIdx,
        simulatorMode,
        nRefreshes,
        historyList,
      },

      async function () {
        if (nRefreshes <= 0) {
          return;
        }

        await sleep(Math.random() * 10);
        this.handleOnClickDice(
          simulatorMode,
          nRefreshes - 1,
          isWaitForSriLanka
        );
      }.bind(this)
    );
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
        <BigTableView historyList={historyList} />
        <GroupStatePointsTableView resultIdx={resultIdx} />
      </Box>
    );
  }
  renderFooter() {
    const onClickRandom = function () {
      this.handleOnClickDice(SimulatorMode.RANDOM, N_RETRY, false);
    }.bind(this);

    const onClickML = function () {
      this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD, 0, false);
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

        <BottomNavigationAction icon={<PsychologyIcon />} onClick={onClickML} />
        <BottomNavigationAction icon={<CasinoIcon />} onClick={onClickRandom} />
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
