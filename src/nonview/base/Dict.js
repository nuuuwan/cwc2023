export default class Dict {
  static sortByValue(dict) {
    return Object.fromEntries(
      Object.entries(dict).sort(([, a], [, b]) => b - a)
    );
  }
}
