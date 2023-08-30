import type { Hand } from "@/shared/domain/hand";
import { getUserHand } from "@/shared/domain/hand";
import { CardSelector } from "@/shared/ui/CardSelector/CardSelector";
import { VoteResult } from "@/shared/ui/VoteResult/VoteResult";
import { filterVotes } from "../lib/filter-votes";
import { useStore } from "@/shared/lib/services/store";

interface Props {
  hands: Hand[];
  isRevealed: boolean;
  onSelectCard: (value: string | null) => void;
}

export function Panel({ hands, isRevealed, onSelectCard }: Props) {
  const {
    user: { id },
  } = useStore();
  const votes = filterVotes(hands);
  const userHand = getUserHand(hands, id);
  const value = userHand?.value;

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
