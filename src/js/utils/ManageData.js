export const getParsedTime = timeString => {
  const time = new Date(timeString);

  return `${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`;
};

export const getUrlSearchParams = (url, params) => {
  const paramsResult = Object.entries(params).reduce((previous, [key, value]) => {
    previous.set(key, value);
    return previous;
  }, new URLSearchParams());

  return `${url}?${paramsResult.toString()}`;
};
