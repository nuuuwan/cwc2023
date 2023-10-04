import { MIN_STATISTICAL_N, MIN_NO_CHANCE_N } from "../constants/STATISTICS.js";

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

  static percent(x) {
    const s = x.toLocaleString(undefined, {
      style: "percent",

      maximumFractionDigits: 0,
    });
    const color = Format.getPercentColor(x);
    return <span style={{ color }}>{s}</span>;
  }

  static binomial(p, n) {
    const EPSILON = 1.0 / MIN_NO_CHANCE_N;

    if (n < MIN_STATISTICAL_N) {
      return "?";
    }

    if (n >= MIN_NO_CHANCE_N) {
      if (p < EPSILON) {
        return EMOJI.LOSER;
      }
      if (p > 1 - EPSILON) {
        return EMOJI.WINNER;
      }
    }

    const q = 1 - p;
    const stdev = Math.sqrt(n * p * q);
    const span = (3 * stdev) / n;
    const opacity = span < p ? 1 : 0.25;

    return <div style={{ opacity, color: "#f80" }}>{Format.percent(p)}</div>;
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
