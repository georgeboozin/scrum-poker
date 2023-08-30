export function groupVotes(votes: string[]) {
  return votes.reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur]++;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });
}
