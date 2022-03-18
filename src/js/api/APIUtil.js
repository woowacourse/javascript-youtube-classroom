import { ERROR_MESSAGE } from '../utils/constants.js';

const APIUtil = {
  async fetchData(requestURL) {
    try {
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error();
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(ERROR_MESSAGE.SEARCH_ERROR);
    }
  },

  createQueryString(endPoint, params) {
    return (
      endPoint +
      '?' +
      Object.entries(params)
        .map(pair => pair[0] + '=' + pair[1])
        .join('&')
    );
  },
};

export default APIUtil;
