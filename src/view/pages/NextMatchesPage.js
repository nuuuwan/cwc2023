import NextMatchesView from "../molecules/NextMatchesView";
import React, { Component } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export default class NextMatchesPage extends Component {
  static name = "NextMatchesPage";
  static Icon = CalendarMonthIcon;

  render() {
    const { simulator, odiStateIdx, bigTable, onClickODI } = this.props;
    return (
      <NextMatchesView
        simulator={simulator}
        odiStateIdx={odiStateIdx}
        bigTable={bigTable}
        onClickODI={onClickODI}
      />
    );
  }
}
