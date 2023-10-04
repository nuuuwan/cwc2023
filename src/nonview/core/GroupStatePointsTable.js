import Team, { TEAM } from "./Team.js";
export default class GroupStagewinsTable {
  constructor(resultIdx) {
    this.resultIdx = resultIdx;
  }

  getTeamToWins() {
    return Object.entries(
      Object.values(this.resultIdx).reduce(function (idx, winner) {
        if (!idx[winner.id]) {
          idx[winner.id] = 0;
        }
        const randomTerm = Math.random() * 0.0001;
        idx[winner.id] += 1 + randomTerm;
        return idx;
      }, Team.emptyDict())
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
    const teamToWins = this.getTeamToWins();
    return Object.keys(teamToWins).map(function (id) {
      return TEAM[id];
    });
  }
}
