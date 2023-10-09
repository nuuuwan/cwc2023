import React, { Component } from "react";
import BigTableView from "../molecules/BigTableView";
import TableRowsIcon from "@mui/icons-material/TableRows";
export default class ProbabilityPage extends Component {
  static name = "ProbabilityPage";
  static Icon = TableRowsIcon;

  render() {
    const { bigTable, onClickTeam, setSnackbarMessage } = this.props;
    return (
      <BigTableView
        bigTable={bigTable}
        onClickTeam={onClickTeam}
        setSnackbarMessage={setSnackbarMessage}
      />
    );
  }
}
