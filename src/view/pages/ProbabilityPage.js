import React, { Component } from "react";
import BigTableView from "../molecules/BigTableView";
import TableRowsIcon from "@mui/icons-material/TableRows";
export default class ProbabilityPage extends Component {
  get name() {
    return "ProbabilityPage";
  }
  getIcon() {
    return TableRowsIcon;
  }
  render() {
    const { bigTable } = this.props;
    return <BigTableView bigTable={bigTable} />;
  }
}
