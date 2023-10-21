import NextMatchView from "../molecules/NextMatchView";
import React, { Component } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export default class NextMatchesPage extends Component {
  static name = "NextMatchesPage";
  static Icon = CalendarMonthIcon;

  render() {
    const {
      simulator,
      odiStateIdx,
      bigTable,
      onClickODI,
      setSnackbarMessage,
      onClickTeam,
    } = this.props;
    return (
      <NextMatchView
        simulator={simulator}
        odiStateIdx={odiStateIdx}
        bigTable={bigTable}
        onClickODI={onClickODI}
        setSnackbarMessage={setSnackbarMessage}
        onClickTeam={onClickTeam}
      />
    );
  }
}
