import { Box } from "@mui/material";
import Team from "../../nonview/core/Team.js";
import Format from "../../nonview/base/Format.js";
import {
  PACK_RATIO,
  MIN_P_FOR_PACK,
} from "../../nonview/constants/STATISTICS.js";

import { COLOR_GRAY_LIST } from "../../nonview/base/Format.js";

import React from "react";

import "./StatsTableViewSVG.css";

const [WIDTH_PER_LABEL, HEIGHT_PER_TEAM] = [48, 32];

export default function StatsTableViewSVG({
  labelToTeamToStat,
  onClickTeam,
  teamIDToColorOverRide,
}) {
  let prevFirstStat = null;
  let iPack = 0;

  const labels = Object.keys(labelToTeamToStat);
  const nLabels = labels.length;
  const firstLabel = labels[0];

  const orderedTeamIDs = Object.keys(labelToTeamToStat[firstLabel]);
  const nTeams = orderedTeamIDs.length;

  const width = (nLabels + 1) * WIDTH_PER_LABEL;
  const height = (nTeams + 1) * HEIGHT_PER_TEAM;
  console.debug({ width, height });

  const px = (x) => WIDTH_PER_LABEL * x;
  const py = (y) => HEIGHT_PER_TEAM * y;

  return (
    <Box>
      <svg
        id="stats-table-view-svg"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g>
            <g>
              <text x={px(0.5)} y={py(0.5)}>
                Team
              </text>
            </g>
            {Object.keys(labelToTeamToStat).map(function (label, iLabel) {
              return (
                <g key={"header-" + label}>
                  <text x={px(iLabel + 1.5)} y={py(0.5)}>
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        <g>
          {orderedTeamIDs.map(function (teamID, iTeam) {
            const team = new Team(teamID);
            const firstStat = labelToTeamToStat[firstLabel][teamID];
            const ratio = prevFirstStat / firstStat;
            prevFirstStat = firstStat;
            if (ratio > PACK_RATIO && prevFirstStat > MIN_P_FOR_PACK) {
              iPack += 1;
            }
            let background = COLOR_GRAY_LIST[iPack];
            if (teamIDToColorOverRide) {
              background = teamIDToColorOverRide[teamID];
            } else {
              background = COLOR_GRAY_LIST[iPack];
            }
            const onClickInner = function () {
              onClickTeam(team);
            };

            const lineStrokeColor = iTeam !== 4 ? "none" : "#8888";

            return (
              <g key={teamID}>
                <rect
                  x={px(0)}
                  y={py(iTeam + 1)}
                  width={WIDTH_PER_LABEL * 2}
                  height={HEIGHT_PER_TEAM}
                  fill={background}
                  onClick={onClickInner}
                />
                <line
                  x1={px(0)}
                  y1={py(iTeam + 1)}
                  x2={px(2)}
                  y2={py(iTeam + 1)}
                  stroke={lineStrokeColor}
                  strokeWidth={2}
                  strokeDasharray="5,5"
                />
                <g>
                  <text x={px(0.5)} y={py(iTeam + 1.5)}>
                    {team.label}
                  </text>
                </g>
                {Object.entries(labelToTeamToStat).map(function ([
                  label,
                  teamToStat,
                ]) {
                  const stat = teamToStat[teamID];
                  return (
                    <g key={"stat-" + label + "-" + teamID}>
                      <text
                        x={px(1.5 + labels.indexOf(label))}
                        y={py(iTeam + 1.5)}
                        style={{ fill: Format.getPercentColor(stat) }}
                      >
                        {Format.percentText(stat)}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>
    </Box>
  );
}
