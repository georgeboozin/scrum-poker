import Box from "@mui/material/Box";
import { useStore } from "@/services/store";
import { Table as SharedTable } from "@/components/Table";
import { Seats } from "@/components/Seats";
import { fillSeats } from "./Table.utils";
import { Hand } from "@/domain/hand";

interface Props {
  hands: Hand[];
  isRevealed: boolean;
  onRevealCards?: () => void;
  onNewVoting?: () => void;
}

export function Table({
  hands,
  isRevealed,
  onRevealCards,
  onNewVoting,
}: Props) {
  const {
    user: { isHost },
  } = useStore();
  const {
    top,
    right,
    bottom: [userHand, ...bottom],
    left,
  } = fillSeats(hands);
  const isSelected = Boolean(userHand.value);
  const user = {
    ...userHand,
    isCurrentUser: true,
  };

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
        <SharedTable
          isSelected={isSelected}
          isHost={Boolean(isHost)}
          isRevealed={isRevealed}
          onRevealCards={onRevealCards}
          onNewVoting={onNewVoting}
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
    </Box>
  );
}
