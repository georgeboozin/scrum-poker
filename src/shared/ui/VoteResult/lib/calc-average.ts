export function calcAverage(votes: string[]) {
  const formattedVotes = votes
    .filter((value) => value !== "?")
    .map((value) => Number(value));

  const average =
    formattedVotes.reduce((acc, cur) => acc + cur, 0) / formattedVotes.length;
  return Math.round(average * 100) / 100;
}
