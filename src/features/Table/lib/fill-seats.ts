import type { Hand } from "@/shared/domain/hand";

const TOP = [1, 4, 6, 8];
const RIGHT = [3];
const BOTTOM = [0, 5, 7, 9];
const LEFT = [2];

export function fillSeats(hands: Hand[]) {
  const top: Hand[] = [];
  const right: Hand[] = [];
  const bottom: Hand[] = [];
  const left: Hand[] = [];

  hands.forEach((hand, index) => {
    if (TOP.includes(index)) {
      top.push(hand);
    }
    if (RIGHT.includes(index)) {
      right.push(hand);
    }
    if (BOTTOM.includes(index)) {
      bottom.push(hand);
    }
    if (LEFT.includes(index)) {
      left.push(hand);
    }
  });

  return { top, right, bottom, left };
}
