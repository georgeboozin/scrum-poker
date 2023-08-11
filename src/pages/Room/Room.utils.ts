import { Hand } from "@/helpers/event-creators";

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
