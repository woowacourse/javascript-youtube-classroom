import { ERROR_MESSAGE, STORAGE_MAX_COUNT } from "./constants/constants";

const videoStorage = {
  getVideo() {
    return JSON.parse(localStorage.getItem("saveVideoData")) || [];
  },
  addVideo(data) {
    let storage = this.getVideo();

    if (this.isSavedVideoId(data.videoId)) {
      return;
    }

    if (storage.length >= STORAGE_MAX_COUNT) {
      throw new Error(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
    }

    storage = [...storage, data];
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
  isSavedVideoId(responseId) {
    const storage = this.getVideo();

    return storage.filter((data) => data.videoId === responseId).length > 0;
  },
};

export default videoStorage;
