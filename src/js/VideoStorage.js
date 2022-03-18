import { ERROR_MESSAGE, STORAGE_MAX_COUNT } from "./constants/constants";
import { isDuplicate } from "./utils/utils";

const videoStorage = {
  getVideo() {
    return JSON.parse(localStorage.getItem("saveVideoData")) || [];
  },
  addVideo(data) {
    let storage = this.getVideo();

    if (isDuplicate(data, storage)) {
      return;
    }

    if (storage.length >= STORAGE_MAX_COUNT) {
      throw new Error(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
    }

    storage = [...storage, data];
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
  removeVideo(removeData) {
    let storage = this.getVideo();

    const removeIndex = storage.findIndex(
      (data) => data.videoId === removeData.videoId
    );

    storage.splice(removeIndex, 1);
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
  addChecked(addData) {
    let storage = this.getVideo();

    const addIndex = storage.findIndex(
      (data) => data.videoId === addData.videoId
    );

    storage[addIndex].checked = true;
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
  removeChecked(removeData) {
    let storage = this.getVideo();

    const removeIndex = storage.findIndex(
      (data) => data.videoId === removeData.videoId
    );

    storage[removeIndex].checked = false;
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
};

export default videoStorage;
