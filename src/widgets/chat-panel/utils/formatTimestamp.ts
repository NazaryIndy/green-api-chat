export const toMilliseconds = (timestamp: number) =>
  timestamp < 1_000_000_000_000 ? timestamp * 1000 : timestamp;

export const formatTimestamp = (timestamp: number) => {
  return new Date(toMilliseconds(timestamp)).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
