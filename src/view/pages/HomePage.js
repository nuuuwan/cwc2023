import { Component } from "react";
import { STYLE } from "./HomePageStyle";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {MenuIcon} from "@mui/icons-material";

import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/core/Simulator.js";
import GroupStatePointsTableView from "../molecules/GroupStatePointsTableView";
import KnockOutStageView from "../molecules/KnockOutStageView";
export default class HomePage extends Component {
  renderHeader() {
    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            #CWC2023
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    )
  }
  renderBody() {
    const simulator = new Simulator();
    const resultIdx = simulator.simulateGroupStage();
    const { odiIdx, koResultIdx } = simulator.simulateKnockOutStage(resultIdx);
    return (
      <Box>
        <GroupStageView resultIdx={resultIdx} />
        <GroupStatePointsTableView resultIdx={resultIdx} />
        <KnockOutStageView odiIdx={odiIdx} koResultIdx={koResultIdx} />
      </Box>
    );
  }
  renderFooter() {
    return "TODO-Footer";
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
