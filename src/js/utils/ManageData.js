export const getParsedTime = timeString => {
  const time = new Date(timeString);

  return `${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`;
};

export const getTimeStamp = (targetDate = new Date()) => Math.round(targetDate.getTime() / 1000);

export const getUrlSearchParams = (url, params) =>
  `${url}?${new URLSearchParams(params).toString()}`;
