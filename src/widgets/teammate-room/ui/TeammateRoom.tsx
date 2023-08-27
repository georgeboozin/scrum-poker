import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Table } from "@/features/table";
import { Panel } from "@/features/panel";
import { useHands } from "@/shared/lib/services/hands";
import { usePeer } from "@/shared/lib/services/teammate/peer";
import { useSelectCard } from "@/shared/lib/use-cases/teammate/select-card";

export function TeammateRoom() {
  const { hands, isRevealed } = useHands();
  const { setup } = usePeer();
  const { selectCard } = useSelectCard();
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
          onSelectCard={selectCard}
        />
      </Box>
    </Box>
  );
}
