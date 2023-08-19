import { CardSelector } from "./CardSelector";
import { VoteResult } from "./VoteResult";
import { calcVotes } from "./Panel.utils";
import { Hand } from "@/shared/domain/hand";

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
