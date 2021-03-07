export const formatDateTime = inputDateTime => {
  const dateTime = new Date(inputDateTime);

  return `${dateTime.getFullYear()}년 ${dateTime.getMonth()}월 ${dateTime.getDate()}일`;
};
