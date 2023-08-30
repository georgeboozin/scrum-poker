import Box from "@mui/material/Box";
import { useStore } from "@/shared/lib/services/store";
import { Hand } from "@/shared/ui/Hand";
import { Seats } from "@/shared/ui/Seats";
import { Table as SharedTable } from "@/shared/ui/Table";
import { Hand as HandType, getUserHand } from "@/shared/domain/hand";
import { fillSeats } from "../lib/fill-seats";
import { mapHandDTO } from "../lib/map-hand-dto";

interface Props {
  hands: HandType[];
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
        isRevealed={isRevealed}
        sx={{
          width: "80%",
          mx: "auto",
          mt: 2,
        }}
      >
        {top.map((hand) => (
          <Hand key={hand.id} {...hand} />
        ))}
      </Seats>
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
          isRevealed={isRevealed}
          sx={{
            mr: 1,
          }}
        >
          {left.map((hand) => (
            <Hand key={hand.id} {...hand} />
          ))}
        </Seats>
        <SharedTable
          isSelected={isSelected}
          isHost={Boolean(isHost)}
          isRevealed={isRevealed}
          onRevealCards={onRevealCards}
          onNewVoting={onNewVoting}
        />
        <Seats
          isRevealed={isRevealed}
          sx={{
            ml: 1,
          }}
        >
          {right.map((hand) => (
            <Hand key={hand.id} {...hand} />
          ))}
        </Seats>
      </Box>
      <Seats
        isRevealed={isRevealed}
        sx={{
          width: "80%",
          mx: "auto",
          mt: 2,
        }}
      >
        {bottom.map((hand) => (
          <Hand key={hand.id} {...hand} />
        ))}
      </Seats>
    </Box>
  );
}
