import { Grid, Box, Typography } from "@mui/material";
import MatchDateView from "../atoms/MatchDateView";
import TeamView from "../atoms/TeamView";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const COLOR_FLIPPED = "#00000018";
const COLOR_CONCLUDED = "#00000010";

export default function ODIView({ odi, winner, odiState, onClickODI }) {
  const onClick = () => {
    if (!odi.isConcluded) {
      onClickODI(odi);
    }
  };

  let winnerInner = winner;

  if (odiState === 1) {
    winnerInner = odi.team1;
  } else if (odiState === 2) {
    winnerInner = odi.team2;
  }
  const isStateFlipped = !!odiState;

  let background = "white";
  let opacity = 1;
  if (odi.isConcluded) {
    background = COLOR_CONCLUDED;
    opacity = 0.5;
  } else if (isStateFlipped) {
    background = COLOR_FLIPPED;
  }

  return (
    <Box>
      <Box
        sx={{
          margin: 0.25,
          padding: 0.25,
          borderStyle: "solid",
          borderWidth: 4,
          borderRadius: 3,
          width: 85,

          borderColor: odi.getColor(winnerInner),
          background,
          opacity,
        }}
        onClick={onClick}
      >
        <Typography variant="body2" sx={{ opacity: 0.5, fontSize: "60%" }}>
          {odi.id}
        </Typography>
        <MatchDateView date={odi.date} />

        <TeamView
          team={odi.favoriteTeam}
          isWinner={odi.favoriteTeam.id === winnerInner.id}
          p={odi.getP(odi.favoriteTeam)}
        />
        <TeamView
          team={odi.underdogTeam}
          isWinner={odi.underdogTeam.id === winnerInner.id}
          p={odi.getP(odi.underdogTeam)}
        />
        <Typography variant="body2">{odi.venue.id}</Typography>
      </Box>

      <Grid container justifyContent="flex-end">
        {isStateFlipped ? <LockIcon sx={{ color: COLOR_FLIPPED }} /> : null}
        {odi.isConcluded ? (
          <CheckCircleOutlineIcon sx={{ color: COLOR_CONCLUDED }} />
        ) : null}
      </Grid>
    </Box>
  );
}
