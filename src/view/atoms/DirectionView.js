import { EMOJI } from "../../nonview/constants/EMOJI";

export default function DirectionView({ dP }) {
  const directionEmoji = dP > 0 ? EMOJI.UP : EMOJI.DOWN;
  const color = dP > 0 ? "#080" : "#f00";
  return <span style={{ color }}>{directionEmoji}</span>;
}
