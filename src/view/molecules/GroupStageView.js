import { GROUP_STAGE_ODI_LIST } from "../../nonview/core/GROUP_STAGE_ODI_LIST.js";
import ODIView from "./ODIView.js";

export default function GroupStageView() {
  return GROUP_STAGE_ODI_LIST.map(function (odi) {
    return <ODIView odi={odi} />;
  });
}
