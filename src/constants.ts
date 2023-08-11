export const CARDS_SET = [
  "0",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "89",
  "?",
];

export const PEER_JS_SERVER = {
  host: "0.peerjs.com",
  port: 443,
  path: "/",
  debug: 0, // 0 - disable logs, 1 - only errors, 2 - errors and warnings, 3 - all logs
};

export enum HostEvents {
  SetHands = "SET_HANDS",
  AddUser = "ADD_USER",
  ChangeHand = "CHANGE_HAND",
  RevealCards = "REVEAL_CARDS",
  ResetVoting = "RESET_VOTING",
  RemoveHand = "REMOVE_HAND",
}

export enum UserEvents {
  SetName = "SET_NAME",
  SelectCard = "SELECT_CARD",
}
