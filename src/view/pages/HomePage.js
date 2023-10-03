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
import FavoriteIcon from "@mui/icons-material/Favorite";

import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/core/Simulator.js";
import GroupStatePointsTableView from "../molecules/GroupStatePointsTableView";
import KnockOutStageView from "../molecules/KnockOutStageView";

import { UPDATE_DATE } from "../../nonview/core/VERSION.js";
import { SimulatorMode } from "../../nonview/core/Simulator.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const FAVORITE_TEAM_NAME = "Sri Lanka";
const FAVORITE_N_RETRY = 100;
export default class HomePage extends Component {
  constructor() {
    super();
    const resultIdx = null,
      odiIdx = null,
      koResultIdx = null,
      simulatorMode = null,
      nRefreshes = null;
    this.state = { resultIdx, odiIdx, koResultIdx, simulatorMode, nRefreshes };
  }

  componentDidMount() {
    this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD, 0);
  }

  handleOnClickDice(simulatorMode, nRefreshes, isWaitForSriLanka) {
    const simulator = new Simulator(simulatorMode);
    const resultIdx = simulator.simulateGroupStage();
    const { odiIdx, koResultIdx } = simulator.simulateKnockOutStage(resultIdx);
    this.setState(
      { resultIdx, odiIdx, koResultIdx, simulatorMode, nRefreshes },

      async function () {
        if (nRefreshes <= 0) {
          if (isWaitForSriLanka) {
            alert(
              `Sorry 🥺.\n${FAVORITE_TEAM_NAME}'s odds of winning the #CWC2023 are less than 1 in ${FAVORITE_N_RETRY}`
            );
          }
          return;
        }

        if (isWaitForSriLanka) {
          if (koResultIdx["Final"].name === FAVORITE_TEAM_NAME) {
            return;
          }
        }

        await sleep(Math.random() * 50 + 25);
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
    const { resultIdx, odiIdx, koResultIdx, simulatorMode } = this.state;
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
        <Typography variant="body2" color={color}>
          <Icon />
          {message}
        </Typography>
        <Typography variant="caption" color={color}>
          {subMessage}
        </Typography>

        <KnockOutStageView odiIdx={odiIdx} koResultIdx={koResultIdx} />
        <GroupStageView resultIdx={resultIdx} />
        <GroupStatePointsTableView resultIdx={resultIdx} />
      </Box>
    );
  }
  renderFooter() {
    const onClickRandom = function () {
      this.handleOnClickDice(SimulatorMode.RANDOM, 10, false);
    }.bind(this);

    const onClickML = function () {
      this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD, 0, false);
    }.bind(this);

    const onClickRefresh = function () {
      window.location.reload();
    };

    const onClickHeart = function () {
      this.handleOnClickDice(SimulatorMode.RANDOM, FAVORITE_N_RETRY, true);
    }.bind(this);

    return (
      <BottomNavigation>
        <BottomNavigationAction
          icon={<RefreshIcon />}
          onClick={onClickRefresh}
        />
        <BottomNavigationAction
          icon={<FavoriteIcon />}
          onClick={onClickHeart}
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
