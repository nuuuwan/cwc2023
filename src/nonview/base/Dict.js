export default class Dict {
  static sortByValue(dict) {
    return Object.fromEntries(
      Object.entries(dict).sort(([, a], [, b]) => b - a)
    );
  }

  static keyToRank(dict) {
    return Object.fromEntries(Object.keys(dict).map((key, i) => [key, i + 1]));
  }

  static normalize(dict, n) {
    return Object.fromEntries(
      Object.entries(dict).map(([key, value]) => [key, value / n])
    );
  }
}
