import { Hand } from "@/domain/hand";

// const UP = [0, 1, 5, 7, 9]; // [1,4,6,8]
// const DOWN = [4, 6, 8, 10]; // [0,5,7,9]
// const LEFT = [2]; // [2]
// const RIGHT = [3]; // [3]

const UP = [1, 4, 6, 8]; // [1,4,6,8]
const DOWN = [0, 5, 7, 9]; // [0,5,7,9]
const LEFT = [2]; // [2]
const RIGHT = [3]; // [3]

export function fillSeats(hands: Hand[]) {
  const top: Hand[] = [];
  const right: Hand[] = [];
  const bottom: Hand[] = [];
  const left: Hand[] = [];

  hands.forEach((hand, index) => {
    if (UP.includes(index)) {
      top.push(hand);
    }
    if (RIGHT.includes(index)) {
      right.push(hand);
    }
    if (DOWN.includes(index)) {
      bottom.push(hand);
    }
    if (LEFT.includes(index)) {
      left.push(hand);
    }
  });

  return { top, right, bottom, left };
}
