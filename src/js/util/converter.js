export const convertDataToDateString = (publishTime) => {
  const dateObject = new Date(publishTime);

  return `${dateObject.getFullYear()}년 ${
    dateObject.getMonth() + 1
  }월 ${dateObject.getDate()}일`;
};
