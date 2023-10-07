import { EPSILON } from "../constants/STATISTICS.js";

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

  static getPercentColorFromBands(p, colorList) {
    const nColor = colorList.length;
    for (let i in colorList) {
      const limit = (1.0 * (parseInt(i) + 1)) / nColor;
      if (p <= limit) {
        return colorList[i];
      }
    }
    return colorList[nColor - 1];
  }

  static getPercentColor1(p) {
    return Format.getPercentColorFromBands(p, [
      "#f00",
      "#fa0",
      "#0a0",
      "#08f",
      "#80f",
    ]);
  }

  static getPercentColor2(p) {
    const h = parseInt(300 * p);
    const s = parseInt(100);
    const [MIN_L, MAX_L] = [20, 60];
    const l = parseInt((1 - p) * (MAX_L - MIN_L) + MIN_L);
    return `hsl(${h},${s}%,${l}%)`;
  }

  static getPercentColor3(p) {
    return Format.getPercentColorFromBands(p, [
      "#f00",
      "#f80",
      "#cc0",
      "#0a0",
      "#08f",
      "#80f",
      "#808",
    ]);
  }

  static getPercentColor(p) {
    return Format.getPercentColor1(p);
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
      return "0%";
    }

    if (p > 1 - EPSILON) {
      return "100%";
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

    const s = Format.percentText(p);

    return (
      <span
        style={{
          color,
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
