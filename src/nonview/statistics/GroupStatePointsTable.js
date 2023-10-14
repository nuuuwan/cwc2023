import Team, { TEAM } from "../core/Team.js";
import { TEAM_ID_TO_POINTS_TABLE_ROW } from "../data/TEAM_ID_TO_POINTS_TABLE_ROW.js";

export default class GroupStagePointsTable {
  constructor(resultIdx) {
    this.resultIdx = resultIdx;
  }

  getTeamToWins() {
    const teamToWins = Object.values(this.resultIdx).reduce(function (
      idx,
      winner
    ) {
      idx[winner.id] += 1;
      return idx;
    },
    Team.initTeamIDToX(0));

    const sortedTeamToWins = Object.fromEntries(
      Object.entries(teamToWins).sort(function ([idA, winsA], [idB, winsB]) {
        if (winsA !== winsB) {
          return winsB - winsA;
        }

        const ptrA = TEAM_ID_TO_POINTS_TABLE_ROW[idA];
        const ptrB = TEAM_ID_TO_POINTS_TABLE_ROW[idB];

        const nrrA = ptrA.netRunRate;
        const nrrB = ptrB.netRunRate;
        return nrrA - nrrB;
      })
    );
    return sortedTeamToWins;
  }

  getTeams() {
    const teamIDToWins = this.getTeamToWins();
    return Object.keys(teamIDToWins).map(function (id) {
      return TEAM[id];
    });
  }
}
