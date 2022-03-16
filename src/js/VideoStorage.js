import { ERROR_MESSAGE, STORAGE_MAX_COUNT } from "./constants/constants";

const videoStorage = {
  getVideo() {
    return JSON.parse(localStorage.getItem("videos")) || [];
  },
  addVideo(data) {
    let storage = this.getVideo();

    if (storage.length >= STORAGE_MAX_COUNT) {
      throw new Error(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
    }

    storage = [...storage, data];
    localStorage.setItem("videos", JSON.stringify(storage));
  },
  isSavedVideoId(responseId) {
    return this.getVideo().includes(responseId);
  },
};

export default videoStorage;
