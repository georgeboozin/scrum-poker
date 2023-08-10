import Box from "@mui/material/Box";
import { Table } from "@/components/Table";
import { useAppContext } from "@/contexts/App";
import { SeatRow } from "./components/SeatRow";
import { CardSelector } from "./components/CardSelector";
import { VoteResult } from "./components/VoteResult";
import { useRoom } from "./Room.hooks";
import { fillRows, calcVotes } from "./Room.utils";

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
  const { topRow, rightRow, bottomRow, leftRow } = fillRows(hands);
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
      <SeatRow
        hands={topRow}
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
        <SeatRow
          hands={leftRow}
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
        <SeatRow
          isRevealed={isRevealed}
          hands={rightRow}
          sx={{
            ml: 1,
          }}
        />
      </Box>
      <SeatRow
        hands={[user, ...bottomRow]}
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
            onSelect={(v: string) => {
              selectCard(v === value ? null : v);
              setUserHand(
                (prev) => prev && { ...prev, name: userHand?.name, value: v }
              );
            }}
          />
        )}
        {isRevealed && <VoteResult votes={votes} />}
      </Box>
    </Box>
  );
}
