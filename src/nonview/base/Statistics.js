export default class Statistics {
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
