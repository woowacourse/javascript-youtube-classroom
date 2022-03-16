export const getParsedTime = timeString => {
  const time = new Date(timeString);

  return `${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`;
};

export const uriBuilder = (endPoint, params) =>
  `${endPoint}?${new URLSearchParams(params).toString()}`;
