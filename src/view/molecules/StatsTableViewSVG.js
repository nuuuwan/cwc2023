import Team from "../../nonview/core/Team.js";
import Format from "../../nonview/base/Format.js";
import React from "react";

export default function StatsTableViewSVG({
  labelToTeamToStat,
  px,
  py,
  teamIDToColor,
}) {
  const labels = Object.keys(labelToTeamToStat);
  const firstLabel = labels[0];
  const orderedTeamIDs = Object.keys(labelToTeamToStat[firstLabel]);

  return (
    <g id="stats-table-view-svg">
      <g>
        <g>
          {Object.keys(labelToTeamToStat).map(function (label, iLabel) {
            return (
              <g key={"header-" + label}>
                <text
                  x={px(iLabel + 1.25)}
                  y={py(0.5)}
                  style={{ fill: "#888" }}
                >
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

          let lineStrokeColor = "#ccc4";
          let strokeDasharray = "";
          if (iTeam === 0) {
            lineStrokeColor = "#8884";
          } else if (iTeam === 4) {
            lineStrokeColor = "#888";
            strokeDasharray = "5,5";
          }

          const color = teamIDToColor ? teamIDToColor[teamID] : "white";
          return (
            <g key={teamID}>
              <rect
                x={px(-0.1)}
                y={py(iTeam + 1 + 0.05)}
                width={px(2.7) - px(0)}
                height={py(0.9) - py(0)}
                fill={color}
              />
              <line
                x1={px(0)}
                y1={py(iTeam + 1)}
                x2={px(2.5)}
                y2={py(iTeam + 1)}
                stroke={lineStrokeColor}
                strokeWidth={1}
                strokeDasharray={strokeDasharray}
              />
              <g>
                <text x={px(0)} y={py(iTeam + 1.5)} className="text-left">
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
                      x={px(2.5 + labels.indexOf(label))}
                      y={py(iTeam + 1.5)}
                      style={{ fill: Format.getPercentColor(stat) }}
                      className="text-right"
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
    </g>
  );
}
