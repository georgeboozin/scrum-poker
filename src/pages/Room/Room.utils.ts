import { Hand } from "@/services/event-creators";

export function formatHands(hostHand: Hand, hands: Hand[]) {
  const newHands = [hostHand];
  hands.forEach((hand) => {
    if (hand.id !== hostHand.id) {
      newHands.push(hand);
    }
  });

  return newHands;
}

const UP = [0, 1, 5, 7, 9];
const DOWN = [4, 6, 8, 10];
const LEFT = [2];
const RIGHT = [3];

export function fillRows(hands: Hand[]) {
  const topRow: Hand[] = [];
  const rightRow: Hand[] = [];
  const bottomRow: Hand[] = [];
  const leftRow: Hand[] = [];

  hands.forEach((hand, index) => {
    if (UP.includes(index)) {
      topRow.push(hand);
    }
    if (RIGHT.includes(index)) {
      rightRow.push(hand);
    }
    if (DOWN.includes(index)) {
      bottomRow.push(hand);
    }
    if (LEFT.includes(index)) {
      leftRow.push(hand);
    }
  });

  return { topRow, rightRow, bottomRow, leftRow };
}

export function calcVotes(hands: Hand[], user: Hand | null) {
  const votes = [];
  if (user?.value) {
    votes.push(user.value);
  }
  hands.forEach((hand) => {
    if (hand.value) {
      votes.push(hand.value);
    }
  });

  return votes;
}
