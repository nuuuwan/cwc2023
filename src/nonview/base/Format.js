import { MIN_STATISTICAL_N, MIN_NO_CHANCE_N } from "../constants/STATISTICS.js";

import { EMOJI } from "../constants/EMOJI.js";

export default class Format {
  static percent(x) {
    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
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

    const renderedCI = (
      <span style={{ fontSize: "80%", whiteSpace: "nowrap", opacity: 0.25 }}>
        {" ± " + Format.percent(span)}
      </span>
    );

    return (
      <span style={{ opacity, color: "#f80" }}>
        {Format.percent(p)}
        {renderedCI}
      </span>
    );
  }

  static matchDate(date) {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  }

  static int(x) {
    return x.toLocaleString(undefined, {
      minimumFractionDigits: 0,
    });
  }
}
