import Box from "@mui/material/Box";
import { useStore } from "@/shared/lib/services/store";
import { Table as SharedTable } from "@/shared/ui/Table";
import { Seats } from "@/shared/ui/Seats";
import { Hand, getUserHand } from "@/shared/domain/hand";
import { fillSeats } from "../lib/fill-seats";
import { mapHandDTO } from "../lib/map-hand-dto";

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
    user: { isHost, id },
  } = useStore();
  const { top, right, bottom, left } = fillSeats(mapHandDTO(hands, id));
  const userHand = getUserHand(hands, id);
  const isSelected = Boolean(userHand?.value);

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
        hands={bottom}
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
