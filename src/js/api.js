export const searchYoutube = async (keyword, pageToken = '') => {
  // const endPoint = `https://vultr.puterism.com/search`;
  const endPoint = `https://www.googleapis.com/youtube/v3/search`;
  const query = getParameters({
    part: 'snippet',
    type: 'video',
    pageToken,
    q: keyword,
    maxResults: '10',
    key: 'AIzaSyA_ca4NBpSVHNpru53rJUC1ZsUaHeorBvQ',
  }).toString();
  const response = await fetch(`${endPoint}?${query}`);

  if (!response.ok) {
    throw Error(`${response.status} 에러가 발생했습니다`);
  }

  return await response.json();
};

export const searchYoutubeById = async (ids = []) => {
  if (ids.length <= 0) return;

  // const endPoint = `https://vultr.puterism.com/videos`;
  const endPoint = `https://www.googleapis.com/youtube/v3/videos`;
  const query = getParameters({
    part: 'snippet',
    type: 'video',
    id: ids.join(','),
    key: 'AIzaSyA_ca4NBpSVHNpru53rJUC1ZsUaHeorBvQ',
  }).toString();
  const response = await fetch(`${endPoint}?${query}`);

  if (!response.ok) {
    throw Error(`${response.status} 에러가 발생했습니다`);
  }

  return await response.json();
};

const getParameters = function (params) {
  const URLparams = new URLSearchParams({});

  const { part, type, key, pageToken = '', maxResults = '', q = '', id = '' } = params;
  Object.keys(params).forEach((key) => {
    if (params[key]) URLparams.set(key, params[key]);
  });

  return URLparams;
};
