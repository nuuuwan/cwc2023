import Team from "../core/Team.js";
import Dict from "../base/Dict.js";
import Simulator from "./Simulator.js";
import { SIMULATOR_MODE } from "./SimulatorMode.js";
import { N_MONTE_CARLO_SIMULATIONS } from "../constants/STATISTICS.js";
import Statistics from "../base/Statistics.js";
import { CWC23_TEAM_ID_LIST } from "../constants/CWC23_TEAM_ID_LIST.js";
import { GROUP_STAGE_ODI_LIST } from "../data/GROUP_STAGE_ODI_LIST.js";
import ODI from "../core/ODI.js";

export const PERCENTILES = [
  0.0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1.0,
];
const N_NEXT_MATCHES = 2;

export default class BigTable {
  constructor(odiStateIdx) {
    console.time("BigTable.constructor");

    this.simulatorList = BigTable.buildSimulatorList(odiStateIdx);
    this.stats = BigTable.getStats(this.simulatorList);

    this.nextODIList = ODI.getNextMatches(GROUP_STAGE_ODI_LIST, N_NEXT_MATCHES);
    this.resultToStats = BigTable.splitHistoryStats(
      this.simulatorList,
      this.nextODIList
    );
    console.timeEnd("BigTable.constructor");
  }

  getOutcomeRank(simulator) {
    const { sumLogPWinner } = simulator.stats;
    const rank = this.simulatorList.filter(function (simulator) {
      return simulator.stats.sumLogPWinner > sumLogPWinner;
    }).length;
    return rank;
  }

  getMostProbableTeamWin(team) {
    for (let simulator of this.simulatorList) {
      const winner = simulator.stats.koResultIdx["Final"];
      if (winner.id === team.id) {
        return simulator;
      }
    }
    return null;
  }

  static buildSimulatorList(odiStateIdx) {
    let simulatorList = [];

    for (let i = 0; i < N_MONTE_CARLO_SIMULATIONS; i++) {
      const simulator = new Simulator(SIMULATOR_MODE.RANDOM, odiStateIdx);
      simulatorList.push(simulator);
    }

    const sortedSimulatorList = simulatorList.sort(function (a, b) {
      return b.stats.sumLogPWinner - a.stats.sumLogPWinner;
    });
    return sortedSimulatorList;
  }

  static splitHistory(simulatorList, odiList) {
    let resultToSimulatorList = {};
    for (let simulator of simulatorList) {
      const resultId = odiList
        .map((odi) => simulator.stats.resultIdx[odi.id].id)
        .join(":");
      if (!resultToSimulatorList[resultId]) {
        resultToSimulatorList[resultId] = [];
      }
      resultToSimulatorList[resultId].push(simulator);
    }
    const sortedResultToSimulatorList = Object.fromEntries(
      Object.entries(resultToSimulatorList).sort(
        (a, b) => b[1].length - a[1].length
      )
    );
    return sortedResultToSimulatorList;
  }

  static splitHistoryStats(simulatorList, odiList) {
    const resultToSimulatorList = BigTable.splitHistory(simulatorList, odiList);
    const resultToStats = Object.fromEntries(
      Object.entries(resultToSimulatorList).map(function ([
        resultID,
        simulatorList,
      ]) {
        const stats = BigTable.getStats(simulatorList);
        return [resultID, stats];
      })
    );
    return resultToStats;
  }

  static getStats(simulatorList) {
    const n = simulatorList.length;
    let teamIDToWinner = Team.initTeamIDToX(0);
    let teamIDToFinalist = Team.initTeamIDToX(0);
    let teamIDToSemiFinalist = Team.initTeamIDToX(0);
    let teamIDToTotalPosition = Team.initTeamIDToX(0);
    let teamIDToPositionList = {};

    for (let simulator of simulatorList) {
      const { koResultIdx, odiIdx, resultIdx } = simulator.stats;

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
    const orderedTeamIDs = CWC23_TEAM_ID_LIST.slice().sort(function (
      teamA,
      teamB
    ) {
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
