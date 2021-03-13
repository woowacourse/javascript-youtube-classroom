export const searchYoutube = async (keyword, pageToken = '') => {
  try {
    const endPoint = `https://vultr.puterism.com/search`;
    const query = getParameters({
      pageToken,
      q: keyword,
    }).toString();
    const response = await fetch(`${endPoint}?${query}`);

    if (!response.ok) {
      throw Error(`${response.status} 에러가 발생했습니다`);
    }

    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const searchYoutubeById = async (ids = []) => {
  if (ids.length <= 0) return;

  try {
    const endPoint = `https://vultr.puterism.com/videos`;
    const query = getParameters({
      id: ids.join(','),
    }).toString();
    const response = await fetch(`${endPoint}?${query}`);

    if (!response.ok) {
      throw Error(`${response.status} 에러가 발생했습니다`);
    }

    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

const getParameters = function ({ part, type, key, pageToken = '', maxResults = '', q = '', id = '' }) {
  const URLparams = new URLSearchParams({});

  const params = arguments[0];
  Object.keys(params).forEach((key) => {
    if (params[key]) URLparams.set(key, params[key]);
  });

  return URLparams;
};
