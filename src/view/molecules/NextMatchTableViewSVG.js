import { Box, Typography } from "@mui/material";
import React from "react";
import { TEAM } from "../../nonview/core/Team.js";
import StatsTableViewSVG from "./StatsTableViewSVG.js";
import Format from "../../nonview/base/Format.js";

import "../../App.css";

function MarkerDefsSVG() {
  return (
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css?family=Akshar');
      </style>
      <marker
        id="head-red"
        orient="auto"
        markerWidth="3"
        markerHeight="4"
        refX="0.1"
        refY="2"
      >
        <path d="M0,0 V4 L2,2 Z" fill="red" />
      </marker>
      <marker
        id="head-green"
        orient="auto"
        markerWidth="3"
        markerHeight="4"
        refX="0.1"
        refY="2"
      >
        <path d="M0,0 V4 L2,2 Z" fill="green" />
      </marker>
    </defs>
  );
}

function LinesSVG({
  stats,
  statsTeam1,
  statsTeam2,
  orderedTeamIDs,
  columnsPerGroup,
  px,
  py,
}) {
  let lines = [];
  for (let teamID of orderedTeamIDs) {
    const rankBefore = stats.teamIDToSemiFinalistRank[teamID];
    const rankAfter1 = statsTeam1.teamIDToSemiFinalistRank[teamID];
    const rankAfter2 = statsTeam2.teamIDToSemiFinalistRank[teamID];

    const pBefore = stats.teamIDToPSemiFinalist[teamID];
    const pAfter1 = statsTeam1.teamIDToPSemiFinalist[teamID];
    const pAfter2 = statsTeam2.teamIDToPSemiFinalist[teamID];

    const P_INTEREST = 0.05;

    for (let [rankAfter, iResult, pAfter] of [
      [rankAfter1, 0, pAfter1],
      [rankAfter2, 2, pAfter2],
    ]) {
      const diffRank = rankAfter - rankBefore;
      const diffP = pAfter - pBefore;
      if (Math.abs(diffP) < P_INTEREST && diffRank === 0) {
        continue;
      }

      let opacity = 0.3;
      if (Math.abs(diffP) > P_INTEREST) {
        opacity = 1.0;
      }

      const color = diffP > 0 ? "green" : "red";

      const x1 = px(2.6 + columnsPerGroup * 1 + 2.1 * (iResult - 1));
      const y1 = py(rankBefore + 1.5);

      const x2 = px(2.6 + columnsPerGroup * iResult - 2.1 * (iResult - 1));
      const y2 = py(rankAfter + 1.5);

      const x12 = (x1 * 2 + x2 * 1) / 3;
      const x21 = (x1 * 1 + x2 * 2) / 3;

      const [STROKE_WIDTH_MIN, STROKE_WIDTH_MAX] = [1, 6];
      const MAX_ABS_P = 0.25;

      const strokeWidth =
        STROKE_WIDTH_MIN +
        ((STROKE_WIDTH_MAX - STROKE_WIDTH_MIN) *
          Math.min(MAX_ABS_P, Math.abs(diffP))) /
          MAX_ABS_P;

      lines.push(
        <path
          key={teamID + "-" + iResult + "-" + iResult}
          d={`M${x1},${y1} L${x12},${y1} L${x21},${y2} L${x2},${y2}`}
          stroke={color}
          fill="#fff"
          strokeWidth={strokeWidth}
          markerEnd={`url(#head-${color})`}
          style={{ opacity }}
        />
      );
    }
  }
  return <g>{lines}</g>;
}

export default function NextMatchTableViewSVG({ bigTable, nextODI }) {
  const { stats } = bigTable;
  const { odiToStats } = bigTable.odiStats;
  const { resultToStats, maxAbsSwing } = odiToStats[nextODI.id];
  const { teamIDToPSemiFinalist: teamIDToSemiFinalistBefore } = bigTable.stats;

  const labelToTeamToStat = {
    Qualify: teamIDToSemiFinalistBefore,
    Diff: Object.fromEntries(
      Object.entries(teamIDToSemiFinalistBefore).map(function ([teamID, p]) {
        return [teamID, p - teamIDToSemiFinalistBefore[teamID]];
      })
    ),
  };

  const [statsTeam1, statsTeam2] = Object.values(resultToStats);
  const [team1ID, team2ID] = Object.keys(resultToStats);
  const [team1, team2] = [team1ID, team2ID].map((teamID) => TEAM[teamID]);

  const labels = Object.keys(labelToTeamToStat);
  const nLabels = labels.length;
  const firstLabel = labels[0];

  const orderedTeamIDs = Object.keys(labelToTeamToStat[firstLabel]);
  const nTeams = orderedTeamIDs.length;

  const SVG_WIDTH = 500;
  const SVG_HEIGHT = 500;

  const columnsPerGroup = nLabels + 3; // PAD Team Label PAD
  const nGroups = 3;
  const nCols = columnsPerGroup * nGroups;
  const nRows = nTeams + 3;

  const WIDTH_PER_LABEL = parseInt(SVG_WIDTH / nCols);
  const HEIGHT_PER_TEAM = parseInt(SVG_HEIGHT / nRows);

  const px = (x) => WIDTH_PER_LABEL * x;
  const py = (y) => HEIGHT_PER_TEAM * y;

  let interestedTeamIDs = [];
  for (let teamID of orderedTeamIDs) {
    const pAfter1 = statsTeam1.teamIDToPSemiFinalist[teamID];
    const pAfter2 = statsTeam2.teamIDToPSemiFinalist[teamID];
    const P_INTEREST = 0.05;

    const diffP = pAfter1 - pAfter2;
    if (Math.abs(diffP) > P_INTEREST) {
      interestedTeamIDs.push(teamID);
    }
  }

  const labelToTeamToStatAfter1 = {
    Qualify: statsTeam1.teamIDToPSemiFinalist,
    Diff: Object.fromEntries(
      Object.entries(statsTeam1.teamIDToPSemiFinalist).map(function ([
        teamID,
        p,
      ]) {
        return [teamID, p - teamIDToSemiFinalistBefore[teamID]];
      })
    ),
  };
  const labelToTeamToStatAfter2 = {
    Qualify: statsTeam2.teamIDToPSemiFinalist,
    Diff: Object.fromEntries(
      Object.entries(statsTeam2.teamIDToPSemiFinalist).map(function ([
        teamID,
        p,
      ]) {
        return [teamID, p - teamIDToSemiFinalistBefore[teamID]];
      })
    ),
  };

  return (
    <Box>
      <Typography variant="caption">
        <span style={{ fontSize: "200%" }}>
          {Format.percentWithColorOverride(maxAbsSwing, -maxAbsSwing + 0.05)}
        </span>
        {" max swing in odds to qualify"}
      </Typography>

      <svg
        id="next-match-table-view-svg"
        viewBox={`0 0 ${SVG_HEIGHT} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <MarkerDefsSVG />
        <LinesSVG
          stats={stats}
          statsTeam1={statsTeam1}
          statsTeam2={statsTeam2}
          orderedTeamIDs={orderedTeamIDs}
          columnsPerGroup={columnsPerGroup}
          px={px}
          py={py}
        />

        <text x={px(2.25)} y={py(0.5)} className="text-center">
          {"If " + team1.label + " wins"}
        </text>

        <text x={px(2.25 + columnsPerGroup * 1)} y={py(0.5)}>
          Before
        </text>

        <text x={px(2.25 + columnsPerGroup * 2)} y={py(0.5)}>
          {"If " + team2.label + " wins"}
        </text>

        <StatsTableViewSVG
          labelToTeamToStat={labelToTeamToStatAfter1}
          px={(x) => px(x + 1)}
          py={(y) => py(y + 1)}
          interestedTeamIDs={interestedTeamIDs}
        />

        <StatsTableViewSVG
          labelToTeamToStat={labelToTeamToStat}
          px={(x) => px(x + 1 + columnsPerGroup)}
          py={(y) => py(y + 1)}
          interestedTeamIDs={interestedTeamIDs}
        />

        <StatsTableViewSVG
          labelToTeamToStat={labelToTeamToStatAfter2}
          px={(x) => px(x + 1 + 2 * columnsPerGroup)}
          py={(y) => py(y + 1)}
          interestedTeamIDs={interestedTeamIDs}
        />
      </svg>
    </Box>
  );
}
