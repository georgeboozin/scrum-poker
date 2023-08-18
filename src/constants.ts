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
  UpdateHands = "UPDATE_HANDS", // ADD_HANDS? UPDATE_HANDS? CHANGE_HANDS
  AddUser = "ADD_USER", // ADD_HAND?
  ChangeHand = "CHANGE_HAND",
  RevealCards = "REVEAL_CARDS",
  ResetVoting = "RESET_VOTING",
  RemoveHand = "REMOVE_HAND",
}

export enum UserEvents {
  SetName = "SET_NAME", // UPDATE_USER UPDATE_USER_NAME CHANGE_USER
  SelectCard = "SELECT_CARD", // UPDATE_HAND_VALUE CHANGE_HAND_VALUE
}
