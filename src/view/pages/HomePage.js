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
  Alert,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import PsychologyIcon from "@mui/icons-material/Psychology";

import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/core/Simulator.js";
import GroupStatePointsTableView from "../molecules/GroupStatePointsTableView";
import KnockOutStageView from "../molecules/KnockOutStageView";

import { UPDATE_DATE } from "../../nonview/core/VERSION.js";
import { SimulatorMode } from "../../nonview/core/Simulator.js";
export default class HomePage extends Component {
  constructor() {
    super();
    const resultIdx = null,
      odiIdx = null,
      koResultIdx = null,
      simulatorMode = null;
    this.state = { resultIdx, odiIdx, koResultIdx, simulatorMode };
  }

  componentDidMount() {
    this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD);
  }

  handleOnClickDice(simulatorMode) {
    const simulator = new Simulator(simulatorMode);
    const resultIdx = simulator.simulateGroupStage();
    const { odiIdx, koResultIdx } = simulator.simulateKnockOutStage(resultIdx);
    this.setState({ resultIdx, odiIdx, koResultIdx, simulatorMode });
  }

  renderHeader() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              #CWC2023 Simulator
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
        "If the outcome of the match is probabilistically selected according to past data.";
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
      this.handleOnClickDice(SimulatorMode.RANDOM);
    }.bind(this);

    const onClickML = function () {
      this.handleOnClickDice(SimulatorMode.MAXIMUM_LIKELIHOOD);
    }.bind(this);

    return (
      <BottomNavigation>
        <BottomNavigationAction icon={<CasinoIcon />} onClick={onClickRandom} />
        <BottomNavigationAction icon={<PsychologyIcon />} onClick={onClickML} />
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
