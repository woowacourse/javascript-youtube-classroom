import { ERROR_MESSAGE } from '../constants/errorMessage';
import { WEB_STORE_KEY } from '../constants/webStore';

export default {
  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  setSavedVideoList(videoId) {
    const currentData = this.getData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY) ?? [];

    if (currentData.length === 100) {
      throw new Error(ERROR_MESSAGE.SAVE_VIDEO_COUNT_OVER);
    }

    localStorage.setItem(
      WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY,
      JSON.stringify([...currentData, videoId])
    );
  },

    localStorage.setItem(
      WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY,
      JSON.stringify([...currentData, videoId])
    );
  },
};
