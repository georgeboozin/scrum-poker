import { Hand } from "@/shared/domain/hand";

export function calcVotes(hands: Hand[]) {
  return hands.reduce((acc, hand) => {
    if (hand.value) {
      acc.push(hand.value);
    }

    return acc;
  }, [] as string[]);
}
