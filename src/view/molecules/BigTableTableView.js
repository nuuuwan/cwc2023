import React from "react";
import StatsTableView from "./StatsTableView.js";

export default function BigTableTableView({ bigTable, onClickTeam }) {
  const {
    teamIDToPWinner,
    teamIDToPFinalist,
    teamIDToPSemiFinalist,
    pctlToTeamIDToPosition,
    orderedTeamIDs,
  } = bigTable.stats;
  const labelToTeamToStat = {
    Qualify: teamIDToPSemiFinalist,
    Finalist: teamIDToPFinalist,
    Winner: teamIDToPWinner,
    "Median Rank": pctlToTeamIDToPosition[0.5],
  };

  return (
    <StatsTableView
      orderedTeamIDs={orderedTeamIDs}
      labelToTeamToStat={labelToTeamToStat}
      onClickTeam={onClickTeam}
    />
  );
}
