export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function sleepJest(ms: number) {
  return jest.advanceTimersByTime(ms);
}
