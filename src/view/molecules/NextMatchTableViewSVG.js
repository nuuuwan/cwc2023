import { Box, Typography } from "@mui/material";
import React from "react";
import { TEAM } from "../../nonview/core/Team.js";
import StatsTableViewSVG from "./StatsTableViewSVG.js";
import Format from "../../nonview/base/Format.js";

function NextMatchForTeam({
  resultID,
  statsBefore,
  statsAfter,
  iResults,
  columnsPerGroup,
  WIDTH_PER_LABEL,
  HEIGHT_PER_TEAM,
  px,
  py,
}) {
  const { teamIDToPSemiFinalist: teamIDToSemiFinalistBefore } = statsBefore;
  const { teamIDToPSemiFinalist: teamIDToSemiFinalistAfter } = statsAfter;
  const labelToTeamToStat = {
    Qualify: teamIDToSemiFinalistAfter,
  };

  let teamIDToColor = {};
  for (let teamID in teamIDToSemiFinalistAfter) {
    const pAfter = teamIDToSemiFinalistAfter[teamID];
    const pBefore = teamIDToSemiFinalistBefore[teamID];
    const diffP = pAfter - pBefore;
    let color = "white";
    const absDiffP = Math.abs(diffP);
    if (absDiffP > 0.01) {
      color = diffP > 0 ? "#080" : "#f00";
      let a = "0";
      if (absDiffP > 0.2) {
        a = "4";
      } else if (absDiffP > 0.1) {
        a = "2";
      } else if (absDiffP > 0.05) {
        a = "1";
      }
      color += a;
    }
    teamIDToColor[teamID] = color;
  }

  return (
    <g key={"table-cell-" + resultID}>
      <StatsTableViewSVG
        labelToTeamToStat={labelToTeamToStat}
        px={(x) => px(x) + (1 + iResults) * columnsPerGroup * WIDTH_PER_LABEL}
        py={(y) => py(y) + HEIGHT_PER_TEAM}
        teamIDToColor={teamIDToColor}
      />
    </g>
  );
}

export default function NextMatchTableViewSVG({ bigTable, nextODI }) {
  const { stats } = bigTable;
  const { odiToStats } = bigTable.odiStats;
  const { resultToStats, maxAbsSwing } = odiToStats[nextODI.id];
  const { teamIDToPSemiFinalist: teamIDToSemiFinalistBefore } = bigTable.stats;

  const labelToTeamToStat = {
    Qualify: teamIDToSemiFinalistBefore,
  };

  const [statsTeam1, statsTeam2] = Object.values(resultToStats);
  const [team1ID, team2ID] = Object.keys(resultToStats);
  const [team1, team2] = [team1ID, team2ID].map((teamID) => TEAM[teamID]);

  const labels = Object.keys(labelToTeamToStat);
  const nLabels = labels.length;
  const firstLabel = labels[0];

  const orderedTeamIDs = Object.keys(labelToTeamToStat[firstLabel]);
  const nTeams = orderedTeamIDs.length;

  const [WIDTH_PER_LABEL, HEIGHT_PER_TEAM] = [40, 32];
  const columnsPerGroup = nLabels + 2;
  const width = 3 * columnsPerGroup * WIDTH_PER_LABEL;
  const height = (nTeams + 3) * HEIGHT_PER_TEAM;
  const px = (x) => WIDTH_PER_LABEL * x;
  const py = (y) => HEIGHT_PER_TEAM * y;

  let lines = [];
  for (let teamID of orderedTeamIDs) {
    const rankBefore = stats.teamIDToSemiFinalistRank[teamID];
    const rankAfter1 = statsTeam1.teamIDToSemiFinalistRank[teamID];
    const rankAfter2 = statsTeam2.teamIDToSemiFinalistRank[teamID];

    const pBefore = stats.teamIDToPSemiFinalist[teamID];
    const pAfter1 = statsTeam1.teamIDToPSemiFinalist[teamID];
    const pAfter2 = statsTeam2.teamIDToPSemiFinalist[teamID];

    for (let [rankAfter, iResult, pAfter] of [
      [rankAfter1, 0, pAfter1],
      [rankAfter2, 2, pAfter2],
    ]) {
      const diffRank = rankAfter - rankBefore;
      if (diffRank === 0) {
        continue;
      }
      const diffP = pAfter - pBefore;
      if (Math.abs(diffP) < 0.00001) {
        continue;
      }
      const color = diffRank < 0 ? "#080" : "#f00";

      const x1 = px(1 + columnsPerGroup * 1 + (iResult - 1));
      const y1 = py(rankBefore + 1.5);

      const x2 = px(1 + columnsPerGroup * iResult - (iResult - 1));
      const y2 = py(rankAfter + 1.5);

      const x12 = (x1 * 2 + x2 * 1) / 3;
      const x21 = (x1 * 1 + x2 * 2) / 3;

      lines.push(
        <path
          key={teamID + "-" + iResult + "-" + iResult}
          d={`M${x1},${y1} L${x12},${y1} L${x21},${y2} L${x2},${y2}`}
          stroke={color}
          fill="#fff"
          strokeWidth={2}
        />
      );
    }
  }

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
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        {lines}
        <g>
          <g>
            <text x={px(1 + columnsPerGroup * 0)} y={py(0.5)}>
              {"If " + team1.label + " wins"}
            </text>
          </g>
          <g>
            <text x={px(1 + columnsPerGroup)} y={py(0.5)}>
              Before
            </text>
          </g>
          <g>
            <text x={px(1 + columnsPerGroup * 2)} y={py(0.5)}>
              {"If " + team2.label + " wins"}
            </text>
          </g>
        </g>

        <g>
          <NextMatchForTeam
            resultID={statsTeam1.resultID}
            statsBefore={stats}
            statsAfter={statsTeam1}
            iResults={-1}
            columnsPerGroup={columnsPerGroup}
            WIDTH_PER_LABEL={WIDTH_PER_LABEL}
            HEIGHT_PER_TEAM={HEIGHT_PER_TEAM}
            px={(x) => px(x)}
            py={(y) => py(y)}
          />{" "}
          <g>
            <StatsTableViewSVG
              labelToTeamToStat={labelToTeamToStat}
              px={(x) => px(x) + columnsPerGroup * WIDTH_PER_LABEL}
              py={(y) => py(y) + HEIGHT_PER_TEAM}
            />
          </g>
          <NextMatchForTeam
            resultID={statsTeam2.resultID}
            statsBefore={stats}
            statsAfter={statsTeam2}
            iResults={1}
            columnsPerGroup={columnsPerGroup}
            WIDTH_PER_LABEL={WIDTH_PER_LABEL}
            HEIGHT_PER_TEAM={HEIGHT_PER_TEAM}
            px={(x) => px(x)}
            py={(y) => py(y)}
          />
        </g>
      </svg>
    </Box>
  );
}
