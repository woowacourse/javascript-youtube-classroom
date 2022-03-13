import { ERROR_MESSAGE } from '../utils/constants.js';
import { videoData } from '../utils/mockData.js';

const APIManager = {
  async fetchData(requestURL) {
    try {
      // const response = await fetch(requestURL);
      // if (!response.ok) {
      //   throw new Error();
      // }
      // const responseData = await response.json();
      return videoData;
    } catch (error) {
      throw new Error(ERROR_MESSAGE.SEARCH_ERROR);
    }
  },

  createQueryString(endPoint, params) {
    return endPoint + '?' + new URLSearchParams(params).toString();
  },
};

export default APIManager;
