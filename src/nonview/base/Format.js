export default class Format {
  static percent(x) {
    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    });
  }
}
