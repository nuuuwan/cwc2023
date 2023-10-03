export default class BigTable {
  constructor(historyList) {
    this.historyList = historyList;
  }

  getTeamProbs() {
    const n = this.historyList.length;
    let teamToWinner = {};
    let teamToFinalist = {};
    let teamToSemiFinalist = {};

    for (let history of this.historyList) {
      const { koResultIdx, odiIdx } = history;

      // Winner
      const winner = koResultIdx["Final"].name;
      if (!teamToWinner[winner]) {
        teamToWinner[winner] = 0;
      }
      teamToWinner[winner] += 1;

      // Finalist
      const odiFinal = odiIdx["Final"];
      const finalists = [odiFinal.team1, odiFinal.team2];
      for (let finalist of finalists) {
        if (!teamToFinalist[finalist.name]) {
          teamToFinalist[finalist.name] = 0;
        }
        teamToFinalist[finalist.name] += 1;
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
        if (!teamToSemiFinalist[semiFinalist.name]) {
          teamToSemiFinalist[semiFinalist.name] = 0;
        }
        teamToSemiFinalist[semiFinalist.name] += 1;
      }
    }
    teamToWinner = Object.fromEntries(
      Object.entries(teamToWinner).sort(([, a], [, b]) => b - a)
    );

    return { n, teamToWinner, teamToFinalist, teamToSemiFinalist };
  }
}
