import { TEAM } from "../../nonview/core/Team.js";
import { EPSILON } from "../../nonview/constants/STATISTICS.js";
export default function AliveView({ bigTable }) {
  if (!bigTable) {
    return null;
  }
  const { n, teamIDToSemiFinalist } = bigTable.stats;
  let front = [];

  for (let [teamID, n1] of Object.entries(teamIDToSemiFinalist)
    .slice()
    .reverse()) {
    const pWinner = n1 / n;
    if (pWinner > EPSILON) {
      front.push(teamID);
    }
  }

  return front.map(function (teamID) {
    const team = TEAM[teamID];
    return (
      <span key={"team-" + teamID} style={{ fontSize: "100%", padding: 1 }}>
        {" "}
        {team.emoji}
      </span>
    );
  });
}
