import { GROUP_STAGE_ODI_LIST } from "../data/GROUP_STAGE_ODI_LIST.js";
import GroupStatePointsTable from "./GroupStatePointsTable.js";
import ODI from "../core/ODI.js";
import { SIMULATOR_MODE } from "../statistics/SimulatorMode.js";
import { VENUE } from "../core/Venue.js";
export default class Simulator {
  constructor(mode, odiStateIdx) {
    this.mode = mode;
    this.odiStateIdx = odiStateIdx;
    this.stats = this.getStats();
  }

  getWinner(odi) {
    const state = this.odiStateIdx[odi.id];
    if (state === 1) {
      return odi.favoriteTeam;
    }
    if (state === 2) {
      return odi.underdogTeam;
    }

    switch (this.mode) {
      case SIMULATOR_MODE.RANDOM:
        return odi.randomWinner;
      case SIMULATOR_MODE.MAXIMUM_LIKELIHOOD:
        return odi.maximumLikelihoodWinner;
      case SIMULATOR_MODE.MINIMUM_LIKELIHOOD:
        return odi.minimumLikelihoodWinner;
      default:
        throw new Error(`Invalid mode: ${this.mode}`);
    }
  }

  simulateGroupStage() {
    const { resultIdx, sumLogPWinner, nUpsets, nMajorUpsets } =
      GROUP_STAGE_ODI_LIST.reduce(
        function ({ resultIdx, sumLogPWinner, nUpsets, nMajorUpsets }, odi) {
          const winner = this.getWinner(odi);
          const pWinner = odi.getP(winner);
          const logPWinner = Math.log(pWinner);

          if (pWinner < 0.2) {
            nMajorUpsets += 1;
          } else if (pWinner < 0.4) {
            nUpsets += 1;
          }

          sumLogPWinner += logPWinner;
          resultIdx[odi.id] = winner;

          return { resultIdx, sumLogPWinner, nUpsets, nMajorUpsets };
        }.bind(this),
        { resultIdx: {}, sumLogPWinner: 0, nUpsets: 0, nMajorUpsets: 0 }
      );
    return { resultIdx, sumLogPWinner, nUpsets, nMajorUpsets };
  }

  simulateKnockOutStage({ resultIdx, sumLogPWinner, nMajorUpsets, nUpsets }) {
    const pointsTable = new GroupStatePointsTable(resultIdx);
    const teams = pointsTable.getTeams();

    const odiSemiFinal1 = new ODI(
      "SF 1",
      new Date("2023-11-15 14:00+05:30"),
      teams[0],
      teams[3],
      VENUE.Mumbai
    );
    const odiSemiFinal2 = new ODI(
      "SF 2",
      new Date("2023-11-16 14:00+05:30"),
      teams[1],
      teams[2],
      VENUE.Kolkata
    );

    const winnerSemiFinal1 = this.getWinner(odiSemiFinal1);
    const winnerSemiFinal2 = this.getWinner(odiSemiFinal2);

    const odiFinal = new ODI(
      "Final",
      new Date("2023-11-19 14:00+05:30"),
      winnerSemiFinal1,
      winnerSemiFinal2,
      VENUE.Ahmedabad
    );
    const winnerFinal = this.getWinner(odiFinal);

    const odiIdx = [odiSemiFinal1, odiSemiFinal2, odiFinal].reduce(function (
      idx,
      odi
    ) {
      idx[odi.id] = odi;
      return idx;
    },
    {});

    const koResultIdx = {
      [odiSemiFinal1.id]: winnerSemiFinal1,
      [odiSemiFinal2.id]: winnerSemiFinal2,
      [odiFinal.id]: winnerFinal,
    };
    for (const pWinner of [
      odiFinal.getP(winnerFinal),
      odiSemiFinal1.getP(winnerSemiFinal1),
      odiSemiFinal2.getP(winnerSemiFinal2),
    ]) {
      sumLogPWinner += Math.log(pWinner);
      if (pWinner < 0.2) {
        nMajorUpsets += 1;
      } else if (pWinner < 0.4) {
        nUpsets += 1;
      }
    }

    return { odiIdx, koResultIdx, sumLogPWinner, nUpsets, nMajorUpsets, teams };
  }

  getStats() {
    const {
      resultIdx,
      sumLogPWinner: sumLogPWinnerGroupStage,
      nUpsets: nUpsetsGroupStage,
      nMajorUpsets: nMajorUpsetsGroupStage,
    } = this.simulateGroupStage();

    const { odiIdx, koResultIdx, sumLogPWinner, nUpsets, nMajorUpsets, teams } =
      this.simulateKnockOutStage({
        resultIdx,
        sumLogPWinner: sumLogPWinnerGroupStage,
        nUpsets: nUpsetsGroupStage,
        nMajorUpsets: nMajorUpsetsGroupStage,
      });

    return {
      resultIdx,
      odiIdx,
      koResultIdx,
      sumLogPWinner,
      nUpsets,
      nMajorUpsets,
      teams,
    };
  }
}
