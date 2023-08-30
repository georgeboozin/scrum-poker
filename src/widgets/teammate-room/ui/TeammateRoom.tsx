import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Table } from "@/features/table";
import { Panel } from "@/features/panel";
import { useHands } from "@/shared/lib/services/hands";
import { usePeerInstaller } from "@/shared/lib/services/teammate/peer-installer";
import { useSelectCard } from "@/shared/lib/use-cases/teammate/select-card";

export function TeammateRoom() {
  const { hands, isRevealed } = useHands();
  const { install } = usePeerInstaller();
  const { selectCard } = useSelectCard();
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
