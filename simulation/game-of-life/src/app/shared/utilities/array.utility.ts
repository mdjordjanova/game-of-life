export function toArray(n: number): number[] {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
  return arr;
}
