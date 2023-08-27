export type Hand = {
  id: string;
  name: string;
  value?: string | null;
};

export function addHand(hands: Hand[], newHand: Hand) {
  return [...hands, newHand];
}

export function removeHand(hands: Hand[], handId: string) {
  return hands.filter((hand) => hand.id !== handId);
}

export function changeHandValue(
  hands: Hand[],
  handId: string,
  value: string | null
) {
  const newHands = hands.reduce((acc, hand) => {
    if (hand.id === handId) {
      const newHand = {
        id: hand.id,
        name: hand.name,
        value: value,
      };
      acc.push(newHand);
    } else {
      acc.push(hand);
    }
    return acc;
  }, [] as Hand[]);

  return newHands;
}

export function resetHands(hands: Hand[]) {
  return hands.map((hand) => ({ ...hand, value: null }));
}

export function getUserHand(hands: Hand[], userId: string) {
  return hands.find((hand) => hand.id === userId);
}
