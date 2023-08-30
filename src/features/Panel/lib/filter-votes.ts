import type { Hand } from "@/shared/domain/hand";

export function filterVotes(hands: Hand[]) {
  return hands
    .filter((hand) => hand.value)
    .map((hand) => hand.value) as string[];
}
