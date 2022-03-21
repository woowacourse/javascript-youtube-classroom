export const changeDateFormat = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
};

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
