import NextMatchesView from "../molecules/NextMatchesView";
import React, { Component } from "react";

export default class NextMatchesPage extends Component {
  get name() {
    return "NextMatchesPage";
  }
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
