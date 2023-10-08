import { TEAM } from "../../nonview/core/Team.js";
import { EPSILON } from "../../nonview/constants/STATISTICS.js";
export default function AliveView({ bigTable }) {
  const { n, orderedTeamIDs, teamIDToSemiFinalist } = bigTable.stats;
  let back = [],
    front = [];
  for (let teamID of orderedTeamIDs.slice().reverse()) {
    const pWinner = teamIDToSemiFinalist[teamID] / n;
    if (pWinner < EPSILON) {
      back.push(teamID);
    } else {
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
