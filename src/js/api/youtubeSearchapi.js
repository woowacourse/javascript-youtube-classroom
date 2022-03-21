import {
  ERROR_403,
  REQUEST_VIDEO_QUANTITY,
  REQUEST_PATH,
  HOST_URL,
  ERROR_MESSAGE,
  SEARCH_VIDEO_REQUEST_PATH,
} from '../constant';

const youtubeSearchAPI = {
  REDIRECT_SERVER_HOST: HOST_URL,
  async searchByPage(value, pageToken) {
    const url = this.createURLByPage(value, pageToken);
    const response = await fetch(url, { method: 'GET' });

    this.checkExceedCapacity(response);
    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.RESPONSE_DENIED);
    }
    return response.json();
  },

  async searchById(id) {
    const url = new URL(SEARCH_VIDEO_REQUEST_PATH, this.REDIRECT_SERVER_HOST);
    const parameter = new URLSearchParams({
      part: 'snippet',
      id: id,
    });
    url.search = parameter.toString();
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      console.log('error');
      return;
    }
    return response.json();
  },

  createURLByPage(value, pageToken) {
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
