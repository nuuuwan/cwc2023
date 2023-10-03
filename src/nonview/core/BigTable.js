export default class BigTable {
  constructor(historyList) {
    this.historyList = historyList;
  }

  getTeamProbs() {
    const n = this.historyList.length;
    let teamToWinner = {};

    for (let history of this.historyList) {
      const { koResultIdx } = history;
      const winner = koResultIdx["Final"].name;
      if (!teamToWinner[winner]) {
        teamToWinner[winner] = 0;
      }
      teamToWinner[winner] += 1;
    }
    teamToWinner = Object.fromEntries(
      Object.entries(teamToWinner).sort(([, a], [, b]) => b - a)
    );

    return { n, teamToWinner };
  }
}
