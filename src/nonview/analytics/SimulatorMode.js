import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CasinoIcon from "@mui/icons-material/Casino";
import Format from "../base/Format.js";
export default class SimulatorMode {
  constructor(id, message, subMessage, color, Icon) {
    this.id = id;
    this.message = message;
    this.subMessage = subMessage;
    this.color = color;
    this.Icon = Icon;
  }
}

export const SIMULATOR_MODE = {
  MAXIMUM_LIKELIHOOD: new SimulatorMode(
    "MAXIMUM_LIKELIHOOD",
    "Most likely outcome",
    "if every match is won by the favourite.",
    Format.getPercentColor(0.9),
    ThumbUpIcon
  ),
  MINIMUM_LIKELIHOOD: new SimulatorMode(
    "MINIMUM_LIKELIHOOD",
    "Least likely Outcome",
    "if every match is won by the underdog.",
    Format.getPercentColor(0.1),
    ThumbDownIcon
  ),
  RANDOM: new SimulatorMode(
    "RANDOM",
    "Random Outcome",
    "if the outcome of each match is randomly selected based on passed outcomes",
    Format.getPercentColor(0.5),
    CasinoIcon
  ),
};
