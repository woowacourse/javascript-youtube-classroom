export const searchYoutube = async (keyword, pageToken = '') => {
  const endPoint = `https://vultr.puterism.com/search/dummy`;
  const query = getParameters({
    pageToken,
    q: keyword,
  }).toString();
  const response = await fetch(`${endPoint}?${query}`);

  if (!response.ok) {
    throw Error(`${response.status} 에러가 발생했습니다`);
  }

  return await response.json();
};

export const searchYoutubeById = async (ids = []) => {
  if (ids.length <= 0) return;

  const endPoint = `https://vultr.puterism.com/videos`;
  const query = getParameters({
    id: ids.join(','),
  }).toString();
  const response = await fetch(`${endPoint}?${query}`);

  if (!response.ok) {
    throw Error(`${response.status} 에러가 발생했습니다`);
  }

  return await response.json();
};

const getParameters = function (params) {
  const URLparams = new URLSearchParams({});

  // const params = arguments[0];
  const { part, type, key, pageToken = '', maxResults = '', q = '', id = '' } = params;
  Object.keys(params).forEach((key) => {
    if (params[key]) URLparams.set(key, params[key]);
  });

  return URLparams;
};
