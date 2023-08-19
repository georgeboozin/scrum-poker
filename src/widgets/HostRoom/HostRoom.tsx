import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useHands } from "@/services/hands";
import { Table } from "@/features/Table";
import { Panel } from "@/features/Panel";
import {
  useHostSelectCard,
  useHostRevealHands,
  useHostResetVoting,
} from "@/application/actions";
import { useHostPeers } from "@/services/host-peers";

export function HostRoom() {
  const { hands, isRevealed } = useHands();
  const { handleSelectCard } = useHostSelectCard();
  const { revealHands } = useHostRevealHands();
  const { resetVoting } = useHostResetVoting();
  const { setup } = useHostPeers();

  const shouldSetupPeer = useRef(true);

  useEffect(() => {
    if (shouldSetupPeer.current) {
      shouldSetupPeer.current = false;
      setup();
    }
  }, []);

  return (
    <Box>
      <Table
        hands={hands}
        isRevealed={isRevealed}
        onRevealCards={revealHands}
        onNewVoting={resetVoting}
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
          hands={hands}
          isRevealed={isRevealed}
          onSelectCard={handleSelectCard}
        />
      </Box>
    </Box>
  );
}
