export default class Format {
  static percent(x) {
    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    });
  }

  static binomial(p, n) {
    if (n < 30) {
      return "?";
    }

    if (n >= 100) {
      if (p < 0.001) {
        return "❌";
      }
      if (p > 0.999) {
        return "✔️";
      }
    }

    const q = 1 - p;
    const stdev = Math.sqrt(n * p * q);
    const span = (3 * stdev) / n;

    const opacity = span < p ? 1 : 0.25;

    return (
      <span style={{ opacity }}>
        {Format.percent(p)}
        <span style={{ fontSize: "80%", whiteSpace: "nowrap", opacity: 0.25 }}>
          {" ± " + Format.percent(span)}
        </span>
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
}
