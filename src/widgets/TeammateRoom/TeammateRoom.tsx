import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Table } from "@/features/Table";
import { Panel } from "@/features/Panel";
import { useHands } from "@/services/hands";
import { useTeammatePeers } from "@/services/teammate-peers";
import { useTeammateSelectCard } from "@/application/actions";

export function TeammateRoom() {
  const { hands, isRevealed } = useHands();
  const { setup } = useTeammatePeers();
  const { handleSelectCard } = useTeammateSelectCard();
  const shouldSetupPeer = useRef(true);

  useEffect(() => {
    if (shouldSetupPeer.current) {
      shouldSetupPeer.current = false;
      setup();
    }
  }, []);

  return (
    <Box>
      <Table hands={hands} isRevealed={isRevealed} />
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
          hands={hands}
          isRevealed={isRevealed}
          onSelectCard={handleSelectCard}
        />
      </Box>
    </Box>
  );
}
