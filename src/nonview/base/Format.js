import { EPSILON } from "../constants/STATISTICS.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
export default class Format {
  // Color
  static gray(p) {
    const s = parseInt(255 * (1 - p));
    return `rgb(${s},${s},${s})`;
  }

  static grayList(n) {
    const list = [];
    for (let i = 0; i < n; i++) {
      list.push(Format.gray(i / (n - 1)));
    }
    return list;
  }

  // Percent
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

  static percentText(p) {
    return p.toLocaleString(undefined, {
      style: "percent",
      maximumFractionDigits: 0,
    });
  }

  static percentWithIcon(p) {
    const color = Format.getPercentColor(p);
    const s = Format.percentText(p);

    let Icon;
    if (p < EPSILON) {
      Icon = CancelIcon;
    } else if (p > 1 - EPSILON) {
      Icon = CheckCircleIcon;
    }

    return (
      <span
        style={{
          color,
        }}
      >
        <span style={{ display: "inline-block" }}>{s}</span>

        <span style={{ display: "inline-block", width: "6px" }}>
          {Icon && (
            <Icon
              sx={{ fontSize: "80%", marginLeft: 0.5, marginTop: 0.1 }}
              color={color}
            />
          )}
        </span>
      </span>
    );
  }

  static percentWithColor(p, pColor, opacity, prefix = "") {
    const color = Format.getPercentColor(pColor);

    const s = Format.percentText(p);

    return (
      <span
        style={{
          color,
          opacity,
        }}
      >
        {prefix + s}
      </span>
    );
  }

  static percent(p) {
    return Format.percentWithColor(p, p, 1.0);
  }

  static percentWithColorOverride(p, dP, prefix = "") {
    const MAX_ABS_P = 0.2;
    const pColor = Math.max(
      0,
      Math.min(1, (dP + MAX_ABS_P) / (2.0 * MAX_ABS_P))
    );

    return Format.percentWithColor(p, pColor, 1.0, prefix);
  }

  static percentChange(p) {
    const prefix = p > 0 ? "+" : "";
    if (Math.abs(p) < 0.005) {
      return "-";
    }
    return Format.percentWithColorOverride(p, p, prefix);
  }

  // Rank

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

  // Date/Time

  static timeStamp(date) {
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      //
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      //
      timeZoneName: "short",
    });
  }

  static matchDate(date) {
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      weekday: "short",
      //
      hour: "numeric",
      minute: "numeric",
    });
  }

  // Numbers

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

export const COLOR_GRAY_LIST = Format.grayList(20);
