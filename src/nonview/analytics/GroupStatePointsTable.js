import Team, { TEAM } from "../core/Team.js";
export default class GroupStagePointsTable {
  constructor(resultIdx) {
    this.resultIdx = resultIdx;
  }

  getTeamToWins() {
    return Object.entries(
      Object.values(this.resultIdx).reduce(function (idx, winner) {
        if (!idx[winner.id]) {
          idx[winner.id] = 0;
        }
        const randomTerm = winner.pWinner * 0.0001;
        idx[winner.id] += 1 + randomTerm;
        return idx;
      }, Team.initTeamIDToX(0))
    )
      .sort(function ([idA, winsA], [idB, winsB]) {
        return winsB - winsA;
      })
      .reduce(function (idx, [id, wins]) {
        idx[id] = parseInt(wins);
        return idx;
      }, {});
  }

  getTeams() {
    const teamIDToWins = this.getTeamToWins();
    return Object.keys(teamIDToWins).map(function (id) {
      return TEAM[id];
    });
  }
}
