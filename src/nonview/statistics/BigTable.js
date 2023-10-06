import Team from "../core/Team.js";
import Dict from "../base/Dict.js";
import Simulator from "./Simulator.js";
import { SIMULATOR_MODE } from "./SimulatorMode.js";
import { N_MONTE_CARLO_SIMULATIONS } from "../constants/STATISTICS.js";
import Statistics from "../base/Statistics.js";
import { CWC23_TEAM_ID_LIST } from "../constants/CWC23_TEAM_ID_LIST.js";
export const PERCENTILES = [
  0.0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1.0,
];

export default class BigTable {
  constructor(odiStateIdx) {
    const historyList = BigTable.buildHistory(odiStateIdx);
    this.stats = BigTable.getStats(historyList, odiStateIdx);
  }

  static buildHistory(odiStateIdx) {
    let historyList = [];

    for (let i = 0; i < N_MONTE_CARLO_SIMULATIONS; i++) {
      const simulator = new Simulator(SIMULATOR_MODE.RANDOM, odiStateIdx);
      historyList.push(simulator.stats);
    }
    return historyList;
  }

  static getStats(historyList, odiStateIdx) {
    
    const n = historyList.length;
    let teamIDToWinner = Team.initTeamIDToX(0);
    let teamIDToFinalist = Team.initTeamIDToX(0);
    let teamIDToSemiFinalist = Team.initTeamIDToX(0);
    let teamIDToTotalPosition = Team.initTeamIDToX(0);
    let teamIDToPositionList = {};

    for (let history of historyList) {
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

      // Total Points / Positions
      let teamIDToPoints = Team.initTeamIDToX(0);
      for (let team of Object.values(resultIdx)) {
        teamIDToPoints[team.id] += 1;
      }
      teamIDToPoints = Dict.sortByValue(teamIDToPoints);
      const orderedTeamIDs = Object.keys(teamIDToPoints);

      for (let iOrder in orderedTeamIDs) {
        const teamID = orderedTeamIDs[iOrder];
        const position = parseInt(iOrder) + 1;
        teamIDToTotalPosition[teamID] += position;

        if (!teamIDToPositionList[teamID]) {
          teamIDToPositionList[teamID] = [];
        }
        teamIDToPositionList[teamID].push(position);
      }
    }

    let teamIDToMedianPosition = {};
    let pctlToTeamIDToPosition = {};

    for (let pctl of PERCENTILES) {
      pctlToTeamIDToPosition[pctl] = {};
      for (let teamID in CWC23_TEAM_ID_LIST) {
        pctlToTeamIDToPosition[pctl][teamID] = null;
      }
    }

    for (let [teamID, positionList] of Object.entries(teamIDToPositionList)) {
      teamIDToMedianPosition[teamID] = Statistics.median(positionList);

      for (let pctl of PERCENTILES) {
        pctlToTeamIDToPosition[pctl][teamID] = Statistics.percentile(
          positionList,
          pctl
        );
      }
    }

    for (let pctl of PERCENTILES) {
      pctlToTeamIDToPosition[pctl] = Dict.sortByValue(
        pctlToTeamIDToPosition[pctl]
      );
    }

    // Order
    const orderedTeamIDs = CWC23_TEAM_ID_LIST.sort(function (teamA, teamB) {
      const dWinner = teamIDToWinner[teamB] - teamIDToWinner[teamA];
      if (dWinner !== 0) {
        return dWinner;
      }
      const dFinalist = teamIDToFinalist[teamB] - teamIDToFinalist[teamA];
      if (dFinalist !== 0) {
        return dFinalist;
      }
      const dSemiFinalist =
        teamIDToSemiFinalist[teamB] - teamIDToSemiFinalist[teamA];
      return dSemiFinalist;
    });

    // (Sort)
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
      teamIDToPositionList,
      pctlToTeamIDToPosition,
      orderedTeamIDs,
    };
  }
}
