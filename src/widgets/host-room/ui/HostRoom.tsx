import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useHands } from "@/shared/lib/services/hands";
import { Table } from "@/features/table";
import { Panel } from "@/features/panel";
import { useSelectCard } from "@/shared/lib/use-cases/host/select-card";
import { useRevealHands } from "@/shared/lib/use-cases/host/reveal-hands";
import { useResetVoting } from "@/shared/lib/use-cases/host/reset-voting";
import { usePeer } from "@/shared/lib/services/host/peer";

export function HostRoom() {
  const { hands, isRevealed } = useHands();
  const { selectCard } = useSelectCard();
  const { revealHands } = useRevealHands();
  const { resetVoting } = useResetVoting();
  const { setup } = usePeer();

  const shouldSetupPeer = useRef(true);

  useEffect(() => {
    if (shouldSetupPeer.current) {
      shouldSetupPeer.current = false;
      setup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          onSelectCard={selectCard}
        />
      </Box>
    </Box>
  );
}
