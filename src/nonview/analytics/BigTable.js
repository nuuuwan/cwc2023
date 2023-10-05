import Team from "../core/Team.js";
import Dict from "../base/Dict.js";
import Simulator from "./Simulator.js";
import { SIMULATOR_MODE } from "./SimulatorMode.js";
import { N_MONTE_CARLO_SIMULATIONS } from "../constants/STATISTICS.js";
import Statistics from "../base/Statistics.js";

export default class BigTable {
  constructor(odiStateIdx) {
    this.stats = this.getStats(odiStateIdx);
  }

  buildHistory(odiStateIdx) {
    let historyList = [];

    for (let i = 0; i < N_MONTE_CARLO_SIMULATIONS; i++) {
      const simulator = new Simulator(SIMULATOR_MODE.RANDOM, odiStateIdx);
      historyList.push(simulator.stats);
    }
    return historyList;
  }

  getStats(odiStateIdx) {
    const historyList = this.buildHistory(odiStateIdx);

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
    let teamIDTo5thPctlPosition = {};
    let teamIDTo10thPctlPosition = {};
    let teamIDTo90thPctlPosition = {};
    let teamIDTo95thPctlPosition = {};

    for (let [teamID, positionList] of Object.entries(teamIDToPositionList)) {
      teamIDToMedianPosition[teamID] = Statistics.median(positionList);
      teamIDTo5thPctlPosition[teamID] = Statistics.percentile(
        positionList,
        0.05
      );
      teamIDTo10thPctlPosition[teamID] = Statistics.percentile(
        positionList,
        0.1
      );
      teamIDTo90thPctlPosition[teamID] = Statistics.percentile(
        positionList,
        0.9
      );
      teamIDTo95thPctlPosition[teamID] = Statistics.percentile(
        positionList,
        0.95
      );
    }

    // Sort
    teamIDToWinner = Dict.sortByValue(teamIDToWinner);
    teamIDToFinalist = Dict.sortByValue(teamIDToFinalist);
    teamIDToSemiFinalist = Dict.sortByValue(teamIDToSemiFinalist);
    teamIDToTotalPosition = Dict.sortByValue(teamIDToTotalPosition);
    teamIDToMedianPosition = Dict.sortByValue(teamIDToMedianPosition);

    teamIDTo5thPctlPosition = Dict.sortByValue(teamIDTo5thPctlPosition);
    teamIDTo10thPctlPosition = Dict.sortByValue(teamIDTo10thPctlPosition);
    teamIDTo90thPctlPosition = Dict.sortByValue(teamIDTo90thPctlPosition);
    teamIDTo95thPctlPosition = Dict.sortByValue(teamIDTo95thPctlPosition);

    return {
      n,
      teamIDToWinner,
      teamIDToFinalist,
      teamIDToSemiFinalist,
      teamIDToTotalPosition,
      teamIDToPositionList,
      teamIDToMedianPosition,
      teamIDTo5thPctlPosition,
      teamIDTo10thPctlPosition,
      teamIDTo90thPctlPosition,
      teamIDTo95thPctlPosition,
    };
  }
}
