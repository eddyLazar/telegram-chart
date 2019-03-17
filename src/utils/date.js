export const dateFormatter = (timestamp = 0) => {
  const date = new Date(timestamp);
  return `${date.getDate()}.${date.getMonth()}`;
};
