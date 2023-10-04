import Team from "../core/Team.js";
import Dict from "../base/Dict.js";
export default class BigTable {
  constructor(historyList) {
    this.historyList = historyList;
  }

  getTeamProbs() {
    const n = this.historyList.length;
    let teamIDToWinner = Team.initTeamIDToX(0);
    let teamIDToFinalist = Team.initTeamIDToX(0);
    let teamIDToSemiFinalist = Team.initTeamIDToX(0);
    let teamIDToTotalPosition = Team.initTeamIDToX(0);
    for (let history of this.historyList) {
      const { koResultIdx, odiIdx, resultIdx } = history;

      // Winner
      const winner = koResultIdx["Final"];
      teamIDToWinner[winner.id] += 1;

      // Finalist
      const odiFinal = odiIdx["Final"];
      const finalists = [odiFinal.team1, odiFinal.team2];
      for (let finalist of finalists) {
        teamIDToFinalist[finalist.id] += 1;
      }

      // Semi-Finalist
      const odiSF1 = odiIdx["SF 1"];
      const odiSF2 = odiIdx["SF 2"];
      const semiFinalists = [
        odiSF1.team1,
        odiSF1.team2,
        odiSF2.team1,
        odiSF2.team2,
      ];
      for (let semiFinalist of semiFinalists) {
        teamIDToSemiFinalist[semiFinalist.id] += 1;
      }

      // Total Points
      let teamIDToPoints = Team.initTeamIDToX(0);
      for (let team of Object.values(resultIdx)) {
        teamIDToPoints[team.id] += 1;
      }
      teamIDToPoints = Dict.sortByValue(teamIDToPoints);
      const orderedTeamIDs = Object.keys(teamIDToPoints);

      for (let iOrder in orderedTeamIDs) {
        const teamID = orderedTeamIDs[iOrder];
        teamIDToTotalPosition[teamID] += parseInt(iOrder) + 1;
      }
    }

    // Sort
    teamIDToWinner = Dict.sortByValue(teamIDToWinner);
    teamIDToFinalist = Dict.sortByValue(teamIDToFinalist);
    teamIDToSemiFinalist = Dict.sortByValue(teamIDToSemiFinalist);
    teamIDToTotalPosition = Dict.sortByValue(teamIDToTotalPosition);

    return {
      n,
      teamIDToWinner,
      teamIDToFinalist,
      teamIDToSemiFinalist,
      teamIDToTotalPosition,
    };
  }
}
