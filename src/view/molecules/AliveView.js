import { TEAM } from "../../nonview/core/Team.js";

const MIN_OPACITY = 0;
const MAX_P = 0.1;

export default function AliveView({ bigTable }) {
  if (!bigTable) {
    return null;
  }
  const { teamIDToPWinner: teamIDToP } = bigTable.stats;

  return Object.entries(teamIDToP)
    .reverse()
    .map(function ([teamID, p]) {
      const team = TEAM[teamID];
      const q = Math.min(p, MAX_P) / MAX_P;
      const opacity = (1 - MIN_OPACITY) * q + MIN_OPACITY;
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
