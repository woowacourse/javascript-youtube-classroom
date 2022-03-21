import { ERROR_EMOJIS, MAX_RENDER_VIDEOS_COUNT } from './constants/constant';

export const $ = (selector, parentNode = document) => parentNode.querySelector(selector);

/* eslint-disable no-param-reassign */
export const arrayToMap = arr => {
  return arr.reduce((obj, val) => {
    obj[val] = 1;
    return obj;
  }, Object.create(null)); // map으로 사용할것이기 때문에 literal이 아닌 Object.create(null)을 사용해서 prototype체인이 일어나지 않도록 한다.
};

export const consoleErrorWithConditionalAlert = (error, errorNameForAlert) => {
  console.error(error);
  if (error.name === errorNameForAlert) {
    alert(error.message);
  }
};

export const parseJSON = (str, fallback) => {
  try {
    return JSON.parse(str) ?? fallback;
  } catch (e) {
    console.error(e);
    return fallback;
  }
};

export const hasProperty = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const randomErrorEmoji = () => {
  return ERROR_EMOJIS[Math.floor(ERROR_EMOJIS.length * Math.random())];
};

export const requestApi = async (url, params) => {
  const serverUrl = new URL(url);
  const parameters = new URLSearchParams(params);
  serverUrl.search = parameters.toString();
  try {
    const response = await fetch(serverUrl);
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.error.message);
    }
    return body;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const requestYoutubeVideos = async (url, params) => {
  const queryParams = {
    part: 'snippet',
    type: 'video',
    maxResults: MAX_RENDER_VIDEOS_COUNT,
    regionCode: 'kr',
    safeSearch: 'strict',
    ...params,
  };
  const result = await requestApi(url, queryParams);
  return result;
};
