import Box from "@mui/material/Box";
import { useAppContext } from "@/contexts/App";
import { Table } from "@/components/Table";
import { Seats } from "@/components/Seats";
import { CardSelector } from "./components/CardSelector";
import { VoteResult } from "./components/VoteResult";
import { useRoom } from "./Room.hooks";
import { fillSeats, calcVotes } from "./Room.utils";

export function Room() {
  const {
    user: { isHost },
  } = useAppContext();
  const {
    selectCard,
    handleReveal,
    handleNewVoting,
    userHand,
    setUserHand,
    hands,
    isRevealed,
    setIsRevealed,
  } = useRoom();
  const { top, right, bottom, left } = fillSeats(hands);
  const value = userHand?.value;
  const isSelected = Boolean(userHand?.value);

  const user = {
    name: String(userHand?.name),
    value: userHand?.value,
    isCurrentUser: true,
  };
  const votes = calcVotes(hands, userHand);

  return (
    <Box>
      <Seats
        hands={top}
        isRevealed={isRevealed}
        sx={{
          width: "80%",
          mx: "auto",
          mt: 2,
        }}
      />
      <Box
        sx={{
          display: "grid",
          gridGap: 1,
          gridTemplateColumns: "1fr 5fr 1fr",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Seats
          hands={left}
          isRevealed={isRevealed}
          sx={{
            mr: 1,
          }}
        />
        <Table
          isSelected={isSelected}
          isHost={Boolean(isHost)}
          isRevealed={isRevealed}
          onRevealCards={() => {
            setIsRevealed(true);
            handleReveal();
          }}
          onNewVoting={() => {
            setIsRevealed(false);
            handleNewVoting();
          }}
        />
        <Seats
          isRevealed={isRevealed}
          hands={right}
          sx={{
            ml: 1,
          }}
        />
      </Box>
      <Seats
        hands={[user, ...bottom]}
        isRevealed={isRevealed}
        sx={{
          width: "80%",
          mx: "auto",
          mt: 2,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          py: 1,
          width: "100%",
          boxShadow: 3,
        }}
      >
        {!isRevealed && (
          <CardSelector
            value={value}
            onSelect={(cardValue: string) => {
              selectCard(cardValue === value ? null : cardValue);
              setUserHand(
                (prev) =>
                  prev && { ...prev, name: userHand?.name, value: cardValue }
              );
            }}
          />
        )}
        {isRevealed && <VoteResult votes={votes} />}
      </Box>
    </Box>
  );
}
