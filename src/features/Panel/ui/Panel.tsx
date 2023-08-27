import type { Hand } from "@/shared/domain/hand";
import { CardSelector } from "@/shared/ui/CardSelector/CardSelector";
import { VoteResult } from "@/shared/ui/VoteResult/VoteResult";
import { calcVotes } from "../lib/calc-votes";

interface Props {
  hands: Hand[];
  isRevealed: boolean;
  onSelectCard: (value: string | null) => void;
}

export function Panel({
  hands: [userHand, ...hands],
  isRevealed,
  onSelectCard,
}: Props) {
  const value = userHand?.value;
  const votes = calcVotes([userHand, ...hands]);

  return (
    <>
      {!isRevealed && (
        <CardSelector
          value={value}
          onSelect={(cardValue: string) =>
            onSelectCard(cardValue === value ? null : cardValue)
          }
        />
      )}
      {isRevealed && <VoteResult votes={votes} />}
    </>
  );
}
