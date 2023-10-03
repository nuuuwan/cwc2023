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

import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/core/Simulator.js";
import GroupStatePointsTableView from "../molecules/GroupStatePointsTableView";
import KnockOutStageView from "../molecules/KnockOutStageView";
export default class HomePage extends Component {
  constructor() {
    super();
    const resultIdx = null,
      odiIdx = null,
      koResultIdx = null;
    this.state = { resultIdx, odiIdx, koResultIdx };
  }

  componentDidMount() {
    this.handleOnClickDice();
  }

  handleOnClickDice() {
    const simulator = new Simulator();
    const resultIdx = simulator.simulateGroupStage();
    const { odiIdx, koResultIdx } = simulator.simulateKnockOutStage(resultIdx);
    this.setState({ resultIdx, odiIdx, koResultIdx });
  }

  renderHeader() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              #CWC2023
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  renderBody() {
    const { resultIdx, odiIdx, koResultIdx } = this.state;
    if (!resultIdx) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <KnockOutStageView odiIdx={odiIdx} koResultIdx={koResultIdx} />
        <GroupStageView resultIdx={resultIdx} />
        <GroupStatePointsTableView resultIdx={resultIdx} />
      </Box>
    );
  }
  renderFooter() {
    return (
      <BottomNavigation>
        <BottomNavigationAction
          icon={<CasinoIcon />}
          onClick={this.handleOnClickDice.bind(this)}
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
