export const preprocessDate = (date) => {
  const [year, month, day] = date.slice(0, 10).split('-');

  return `${year}년 ${month}월 ${day}일`;
};
