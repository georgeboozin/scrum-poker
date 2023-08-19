import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useHands } from "@/shared/lib/services/hands";
import { Table } from "@/features/table";
import { Panel } from "@/features/panel";
import { useSelectCard } from "@/shared/lib/use-cases/host/select-card";
import { useRevealHands } from "@/shared/lib/use-cases/host/reveal-hands";
import { useResetVoting } from "@/shared/lib/use-cases/host/reset-voting";
import { useHostPeers } from "@/shared/lib/services/host-peers";

export function HostRoom() {
  const { hands, isRevealed } = useHands();
  const { handleSelectCard } = useSelectCard();
  const { revealHands } = useRevealHands();
  const { resetVoting } = useResetVoting();
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
