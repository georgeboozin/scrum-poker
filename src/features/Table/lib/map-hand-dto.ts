import type { Hand } from "@/shared/domain/hand";

export function mapHandDTO(hands: Hand[], userId: string) {
  return hands.map((hand) => ({ ...hand, isCurrentUser: hand.id === userId }));
}
