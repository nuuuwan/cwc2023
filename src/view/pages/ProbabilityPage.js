import React, { Component } from "react";
import BigTableView from "../molecules/BigTableView";

export default class ProbabilityPage extends Component {
  get name() {
    return "ProbabilityPage";
  }
  render() {
    const { bigTable } = this.props;
    return <BigTableView bigTable={bigTable} />;
  }
}
