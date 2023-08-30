import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useHands } from "@/shared/lib/services/hands";
import { Table } from "@/features/table";
import { Panel } from "@/features/panel";
import { useSelectCard } from "@/shared/lib/use-cases/host/select-card";
import { useRevealHands } from "@/shared/lib/use-cases/host/reveal-hands";
import { useResetVoting } from "@/shared/lib/use-cases/host/reset-voting";
import { usePeerInstaller } from "@/shared/lib/services/host/peer-installer";

export function HostRoom() {
  const { hands, isRevealed } = useHands();
  const { selectCard } = useSelectCard();
  const { revealHands } = useRevealHands();
  const { resetVoting } = useResetVoting();
  const { install } = usePeerInstaller();

  const shouldInstallPeer = useRef(true);

  useEffect(() => {
    if (shouldInstallPeer.current) {
      shouldInstallPeer.current = false;
      install();
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
