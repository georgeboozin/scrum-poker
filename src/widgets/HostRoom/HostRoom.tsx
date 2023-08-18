import Box from "@mui/material/Box";
import { useHands } from "@/services/hands";
import { Table } from "@/features/Table";
import { Panel } from "@/features/Panel";
import { useHostRoom } from "./HostRoom.hooks";

export function HostRoom() {
  const {
    hands: [userHand, ...hands],
  } = useHands();
  const { handleSelectCard, handleReveal, handleNewVoting, isRevealed } =
    useHostRoom();

  return (
    <Box>
      <Table
        hands={[userHand, ...hands]}
        isRevealed={isRevealed}
        onRevealCards={handleReveal}
        onNewVoting={handleNewVoting}
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
        <Panel
          hands={[userHand, ...hands]}
          isRevealed={isRevealed}
          onSelectCard={handleSelectCard}
        />
      </Box>
    </Box>
  );
}
