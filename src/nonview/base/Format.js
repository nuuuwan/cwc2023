import { MIN_STATISTICAL_N, MIN_NO_CHANCE_N } from "../constants/STATISTICS.js";

import { EMOJI } from "../constants/EMOJI.js";

export default class Format {
  static percent(x) {
    return x.toLocaleString(undefined, {
      style: "percent",

      maximumFractionDigits: 0,
    });
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
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  }

  static int(x) {
    for (let [v, suffix] of [
      [1_000_000_000_000_000_000_000_000, "x10²⁴"],
      [1_000_000_000_000_000_000_000, "x10²¹"],
      [1_000_000_000_000_000_000, "x10¹⁸"],
      [1_000_000_000_000_000, "x10¹⁵"],
      [1_000_000_000_000, "x10¹²"],
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
