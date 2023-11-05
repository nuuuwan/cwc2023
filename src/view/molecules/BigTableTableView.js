import React from "react";
import StatsTableView from "./StatsTableView.js";

export default function BigTableTableView({ bigTable, onClickTeam }) {
  const {
    teamIDToPWinner,
    teamIDToPFinalist,
    teamIDToPSemiFinalist,
    orderedTeamIDs,
    pctlToTeamIDToPosition,
  } = bigTable.stats;

  const labelToTeamToStat = {
    Qualify: teamIDToPSemiFinalist,
    Finalist: teamIDToPFinalist,
    Winner: teamIDToPWinner,
    "Rank-Best": pctlToTeamIDToPosition[0.0],
    "Rank-Worst": pctlToTeamIDToPosition[1.0],
  };

  return (
    <StatsTableView
      orderedTeamIDs={orderedTeamIDs}
      labelToTeamToStat={labelToTeamToStat}
      onClickTeam={onClickTeam}
    />
  );
}
