export const getParsedTime = timeString => {
  const time = new Date(timeString);

  return `${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`;
};

export const uriBuilder = (uri, params = {}) =>
  `${uri}?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
