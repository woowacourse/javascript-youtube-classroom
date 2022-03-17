import {
  ERROR_403,
  REQUEST_VIDEO_QUANTITY,
  REQUEST_PATH,
  HOST_URL,
  ERROR_MESSAGE,
} from '../constant';

const youtubeSearchAPI = {
  REDIRECT_SERVER_HOST: HOST_URL,
  async searchByApi(value, pageToken) {
    const url = this.createSearchByPageURL(value, pageToken);
    const response = await fetch(url, { method: 'GET' });

    this.checkResponceOk(response);
    const result = await response.json();

    return result;
  },

  createSearchByPageURL(value, pageToken) {
    const url = new URL(REQUEST_PATH, this.REDIRECT_SERVER_HOST);
    const parameter = new URLSearchParams({
      part: 'snippet',
      maxResults: REQUEST_VIDEO_QUANTITY,
      pageToken: pageToken || '',
      q: value,
      type: 'video',
    });
    url.search = parameter.toString();

    return url;
  },

  checkResponceOk(response) {
    if (response.ok) {
      return;
    }

    if (response.status === 403) {
      const error = new Error(ERROR_MESSAGE.EXCEED_REQUEST_CAPACITY_ERROR);
      error.name = ERROR_403;
      throw error;
    }

    throw new Error(ERROR_MESSAGE.NOT_RESPONCE_OK);
  },
};

export default youtubeSearchAPI;
