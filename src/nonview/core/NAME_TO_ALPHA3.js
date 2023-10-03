export const NAME_TO_ALPHA3 = {
  Afghanistan: "AFG",
  Australia: "AUS",
  Bangladesh: "BGD",
  England: "ENG",
  India: "IND",
  Netherlands: "NLD",
  "New Zealand": "NZL",
  Pakistan: "PAK",
  "South Africa": "ZAF",
  "Sri Lanka": "LKA",
};

export const ALPHA3_TO_NAME = Object.entries(NAME_TO_ALPHA3).reduce(function (
  idx,
  [name, alpha3]
) {
  idx[alpha3] = name;
  return idx;
},
{});
