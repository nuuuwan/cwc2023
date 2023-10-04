import { TEAM } from "../../nonview/core/Team.js";
import { EPSILON } from "../../nonview/constants/STATISTICS.js";
export default function AliveView({ n, teamIDToWinner }) {
  let back = [],
    front = [];
  for (let teamID of Object.keys(teamIDToWinner).reverse()) {
    const pWinner = teamIDToWinner[teamID] / n;
    if (pWinner < EPSILON) {
      back.push(teamID);
    } else {
      front.push(teamID);
    }
  }

  return front.map(function (teamID) {
    const team = TEAM[teamID];
    return (
      <span key={"team-" + teamID} style={{ fontSize: "110%", padding: 2 }}>
        {" "}
        {team.emoji}
      </span>
    );
  });
}
