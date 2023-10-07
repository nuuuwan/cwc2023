import { EPSILON } from "../constants/STATISTICS.js";

import { EMOJI } from "../constants/EMOJI.js";

export default class Format {
  static timeStamp(date) {
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      //
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }
  static getPercentColorOld(p) {
    if (p <= 0.2) {
      return "#f00";
    }

    if (p <= 0.4) {
      return "#f80";
    }

    if (p <= 0.6) {
      return "#0c0";
    }

    if (p <= 0.8) {
      return "#088";
    }

    return "#008";
  }

  static getPercentColor(p) {
    const h = parseInt(240 * p);
    const s = parseInt(100);
    const l = parseInt((1 - p) * 60 + 20);
    return `hsl(${h},${s}%,${l}%)`;
  }

  static rank(rank) {
    const color = Format.getPercentColor((10 - rank) / 9);
    return (
      <span
        style={{
          color,
        }}
      >
        {rank}
      </span>
    );
  }

  static percentText(p) {
    if (p < EPSILON) {
      return EMOJI.LOSER;
    }

    if (p > 1 - EPSILON) {
      return EMOJI.WINNER;
    }

    if (p < 0.005) {
      return "<0.5%";
    }

    if (p > 0.995) {
      return ">99.5%";
    }

    return p.toLocaleString(undefined, {
      style: "percent",
      maximumFractionDigits: 0,
    });
  }

  static percent(p) {
    const color = Format.getPercentColor(p);
    let background = color + "1",
      borderRadius = "50%",
      padding = 3,
      borderColor = color,
      borderStyle = "solid",
      borderWidth = 1;

    const s = Format.percentText(p);

    if (EPSILON <= p && p <= 1 - EPSILON) {
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
