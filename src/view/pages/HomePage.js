import { Component } from "react";
import { STYLE } from "./HomePageStyle";
import { Box } from "@mui/material";
import GroupStageView from "../molecules/GroupStageView";
import Simulator from "../../nonview/core/Simulator.js";
import GroupStatePointsTableView from "../molecules/GroupStatePointsTableView";
export default class HomePage extends Component {
  renderHeader() {
    return "TODO-Header";
  }
  renderBody() {
    const resultIdx = new Simulator().getRandomResultIdx();
    return (
      <Box>
        <GroupStageView resultIdx={resultIdx} />
        <GroupStatePointsTableView resultIdx={resultIdx} />
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
