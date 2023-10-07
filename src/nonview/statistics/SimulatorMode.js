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
  MINIMUM_LIKELIHOOD: new SimulatorMode(
    "MINIMUM_LIKELIHOOD",
    "Least likely Outcome",
    "Underdog wins every match",
    Format.getPercentColor(0.1),
    ThumbDownIcon
  ),
  RANDOM: new SimulatorMode(
    "RANDOM",
    "Random Outcome",
    "Outcome selected randomly.",
    Format.getPercentColor(0.5),
    CasinoIcon
  ),
  MAXIMUM_LIKELIHOOD: new SimulatorMode(
    "MAXIMUM_LIKELIHOOD",
    "Most likely outcome",
    "Favourite wins every match.",
    Format.getPercentColor(0.9),
    ThumbUpIcon
  ),
};
