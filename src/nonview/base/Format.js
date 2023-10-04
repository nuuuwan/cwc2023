import { MIN_NO_CHANCE_N } from "../constants/STATISTICS.js";

import { EMOJI } from "../constants/EMOJI.js";

export default class Format {
  static getPercentColor(p) {
    if (p <= 0.2) {
      return "#f00";
    }

    if (p <= 0.4) {
      return "#f80";
    }

    if (p <= 0.6) {
      return "#080";
    }

    if (p <= 0.8) {
      return "#088";
    }

    return "#008";
  }

  static percent(p) {
    const EPSILON = 0.1 / MIN_NO_CHANCE_N;
    let s = "";
    if (p < EPSILON) {
      s = EMOJI.LOSER;
    } else if (p > 1 - EPSILON) {
      s = EMOJI.WINNER;
    } else {
      s = p.toLocaleString(undefined, {
        style: "percent",

        maximumFractionDigits: 0,
      });
    }

    const color = Format.getPercentColor(p);
    return <span style={{ color }}>{s}</span>;
  }

  static matchDate(date) {
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  }

  static bigInt(x) {
    return x.toExponential(0);
  }

  static int(x) {
    if (x > 1_000_000_000_000) {
      return Format.bigInt(x);
    }

    for (let [v, suffix] of [
      [1_000_000_000, "B"],
      [1_000_000, "M"],
      [1_000, "K"],
    ]) {
      if (x > v) {
        return (
          (x / v).toLocaleString(undefined, { maximumSignificantDigits: 2 }) +
          suffix
        );
      }
    }

    return x.toLocaleString(undefined, { maximumSignificantDigits: 2 });
  }
}
