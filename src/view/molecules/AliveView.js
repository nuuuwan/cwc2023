import { TEAM } from "../../nonview/core/Team.js";

const MIN_OPACITY = 0;

export default function AliveView({ bigTable }) {
  if (!bigTable) {
    return null;
  }
  const { n, teamIDToSemiFinalist } = bigTable.stats;

  return Object.entries(teamIDToSemiFinalist)
    .reverse()
    .map(function ([teamID, nQualify]) {
      const pQualify = nQualify / n;
      const team = TEAM[teamID];
      const opacity = pQualify * (1 - MIN_OPACITY) + MIN_OPACITY;
      return (
        <span
          key={"team-" + teamID}
          style={{ opacity, fontSize: "100%", padding: 1 }}
        >
          {" "}
          {team.emoji}
        </span>
      );
    });
}
