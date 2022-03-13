import {
  ERROR_403,
  REQUEST_VIDEO_QUANTITY,
  REQUEST_PATH,
  HOST_URL,
  ERROR_MESSAGE,
} from '../constant';

const youtubeSearchAPI = {
  REDIRECT_SERVER_HOST: HOST_URL,
  async searchByPage(value, pageToken) {
    const url = this.createURL(value, pageToken);
    const response = await fetch(url, { method: 'GET' });

    this.checkExceedCapacity(response);
    return await response.json();
  },

  createURL(value, pageToken) {
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

  checkExceedCapacity(response) {
    if (response.status !== 403) return;
    const error = new Error(ERROR_MESSAGE.EXCEED_REQUEST_CAPACITY_ERROR);
    error.name = ERROR_403;
    throw error;
  },
};

export default youtubeSearchAPI;
