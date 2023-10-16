import React from "react";
import StatsTableView from "./StatsTableView.js";

export default function BigTableTableView({ bigTable, onClickTeam }) {
  const {
    teamIDToPWinner,
    teamIDToPFinalist,
    teamIDToPSemiFinalist,
    orderedTeamIDs,
  } = bigTable.stats;

  const labelToTeamToStat = {
    Qualify: teamIDToPSemiFinalist,
    Finalist: teamIDToPFinalist,
    Winner: teamIDToPWinner,
  };

  return (
    <StatsTableView
      orderedTeamIDs={orderedTeamIDs}
      labelToTeamToStat={labelToTeamToStat}
      onClickTeam={onClickTeam}
    />
  );
}
