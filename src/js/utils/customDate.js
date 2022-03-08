export function convertTime(time) {
  const date = new Date(time);

  return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`;
}
