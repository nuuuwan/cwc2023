import { EPSILON } from "../constants/STATISTICS.js";

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
    let s = "";
    const color = Format.getPercentColor(p);
    let background = color + "1",
      borderRadius = "50%",
      padding = 3,
      borderColor = color,
      borderStyle = "solid",
      borderWidth = 1;

    if (p < EPSILON) {
      s = EMOJI.LOSER;
    } else if (p > 1 - EPSILON) {
      s = EMOJI.WINNER;
    } else {
      s = p.toLocaleString(undefined, {
        style: "percent",

        maximumFractionDigits: 0,
      });
      padding = 0;
      borderColor = background = "#fff0";
    }

    return (
      <span
        style={{
          color,
          background,
          borderRadius,
          padding,
          borderColor,
          borderStyle,
          borderWidth,
        }}
      >
        {s}
      </span>
    );
  }

  static matchDate(date) {
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  }

  static float(x) {
    return x.toLocaleString(undefined, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
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
      if (x >= v) {
        return (
          (x / v).toLocaleString(undefined, { maximumSignificantDigits: 2 }) +
          suffix
        );
      }
    }

    return x.toLocaleString(undefined, { maximumSignificantDigits: 2 });
  }
}
