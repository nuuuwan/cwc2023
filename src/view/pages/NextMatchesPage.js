import NextMatchesView from "../molecules/NextMatchesView";

export default function NextMatchesPage({
  simulator,
  odiStateIdx,
  bigTable,
  onClickODI,
}) {
  return (
    <NextMatchesView
      simulator={simulator}
      odiStateIdx={odiStateIdx}
      bigTable={bigTable}
      onClickODI={onClickODI}
    />
  );
}
