import { Paper, Typography } from "@mui/material";
import MatchDateView from "../atoms/MatchDateView";
import TeamView from "../atoms/TeamView";
import LockIcon from "@mui/icons-material/Lock";
export default function ODIView({ odi, winner, odiState, onClickODI }) {
  const onClick = () => {
    if (!odi.isConcluded) {
      onClickODI(odi);
    }
  };
  const opacity = odi.isConcluded ? 0.2 : 1;
  let winnerInner = winner;

  if (odiState === 1) {
    winnerInner = odi.team1;
  } else if (odiState === 2) {
    winnerInner = odi.team2;
  }
  const isStateFlipped = !!odiState;

  return (
    <Paper
      sx={{
        margin: 0.5,
        padding: 0.5,
        borderColor: odi.getColor(winnerInner) + "8",
        borderStyle: "solid",
        borderWidth: 4,
        borderRadius: 2,
        opacity,
        width: 90,
        background: isStateFlipped ? "#ccc" : "#fff",
      }}
      onClick={onClick}
    >
      <MatchDateView date={odi.date} />
      <TeamView
        team={odi.team1}
        isWinner={odi.team1.id === winnerInner.id}
        p={odi.getP(odi.team1)}
      />
      <TeamView
        team={odi.team2}
        isWinner={odi.team2.id === winnerInner.id}
        p={odi.getP(odi.team2)}
      />
      <Typography variant="body2">{odi.venue.id}</Typography>
      {isStateFlipped ? <LockIcon /> : null}
    </Paper>
  );
}
