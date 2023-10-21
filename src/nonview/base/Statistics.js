export default class Statistics {
  static mean(xList) {
    const n = xList.length;
    const sum = xList.reduce((a, b) => a + b, 0);
    return sum / n;
  }

  static l1Mean(xList) {
    const n = xList.length;
    const sum = xList.reduce((a, b) => a + Math.abs(b), 0);
    return sum / n;
  }

  static maxAbs(xList) {
    return Math.max(...xList.map(Math.abs));
  }

  static median(xList) {
    return Statistics.percentile(xList, 0.5);
  }

  static percentile(xList, p) {
    xList.sort((a, b) => a - b);
    const n = xList.length;
    // 0.0 -> 0, 1.0 -> n - 1
    const i = Math.floor(p * (n - 1));
    return xList[i];
  }
}
