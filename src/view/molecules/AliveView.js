import { TEAM } from "../../nonview/core/Team.js";
import { EPSILON } from "../../nonview/constants/STATISTICS.js";
export default function AliveView({ n, teamIDToSemiFinalist }) {
  let back = [],
    front = [];
  for (let teamID of Object.keys(teamIDToSemiFinalist).reverse()) {
    const pSemiFinalist = teamIDToSemiFinalist[teamID] / n;
    if (pSemiFinalist < EPSILON) {
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
