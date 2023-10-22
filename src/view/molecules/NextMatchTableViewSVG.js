import { Box, Typography } from "@mui/material";
import React from "react";
import { TEAM } from "../../nonview/core/Team.js";
import StatsTableViewSVG from "./StatsTableViewSVG.js";
import Format from "../../nonview/base/Format.js";

function NextMatchForTeam({
  resultID,
  stats,
  iResults,
  columnsPerGroup,
  WIDTH_PER_LABEL,
  HEIGHT_PER_TEAM,
  px,
  py,
}) {
  const { teamIDToPSemiFinalist: teamIDToSemiFinalistAfter } = stats;
  const labelToTeamToStat = {
    Qualify: teamIDToSemiFinalistAfter,
  };

  return (
    <g key={"table-cell-" + resultID}>
      <StatsTableViewSVG
        labelToTeamToStat={labelToTeamToStat}
        px={(x) => px(x) + (1 + iResults) * columnsPerGroup * WIDTH_PER_LABEL}
        py={(y) => py(y) + HEIGHT_PER_TEAM}
      />
    </g>
  );
}

export default function NextMatchTableViewSVG({
  bigTable,
  onClickTeam,
  nextODI,
}) {
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

  const [WIDTH_PER_LABEL, HEIGHT_PER_TEAM] = [48, 32];
  const columnsPerGroup = nLabels + 2;
  const width = 3 * columnsPerGroup * WIDTH_PER_LABEL;
  const height = (nTeams + 3) * HEIGHT_PER_TEAM;
  const px = (x) => WIDTH_PER_LABEL * x;
  const py = (y) => HEIGHT_PER_TEAM * y;

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
            stats={statsTeam1}
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
            stats={statsTeam2}
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
