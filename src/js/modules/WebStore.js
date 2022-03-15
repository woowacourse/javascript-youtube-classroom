export default {
  getArrayData(key) {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  },
  setDataInArray(key, data) {
    const currentData = this.getArrayData(key);

    localStorage.setItem(key, JSON.stringify([...currentData, data]));
  },

    localStorage.setItem(
      WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY,
      JSON.stringify([...currentData, videoId])
    );
  },
};
