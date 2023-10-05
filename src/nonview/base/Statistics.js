export default class Statistics {
  static median(xList) {
    return Statistics.percentile(xList, 0.5);
  }

  static percentile(xList, p) {
    xList.sort((a, b) => a - b);
    const n = xList.length;
    const i = Math.floor(p * n);
    return xList[i];
  }
}
