import Box from "@mui/material/Box";
import { useTeammateRoom } from "./TeammateRoom.hooks";
import { Table } from "@/features/Table";
import { Panel } from "@/features/Panel";
import { useHands } from "@/services/hands";

export function TeammateRoom() {
  const {
    hands: [userHand, ...hands],
  } = useHands();
  const { handleSelectCard, isRevealed } = useTeammateRoom();

  return (
    <Box>
      <Table hands={[userHand, ...hands]} isRevealed={isRevealed} />
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
