import {
  validateAddData,
  changeStorageChecked,
  removeStorageItem,
} from "./utils";

const videoStorage = {
  getVideo() {
    return JSON.parse(localStorage.getItem("saveVideoData")) || [];
  },
  addVideo(data) {
    let storage = this.getVideo();
    validateAddData(data, storage);

    storage = [...storage, data];
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
  removeVideo(removeData) {
    let storage = this.getVideo();

    storage = removeStorageItem(storage, removeData);
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
  addChecked(addData) {
    let storage = this.getVideo();

    storage = changeStorageChecked(storage, addData, true);
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
  removeChecked(removeData) {
    let storage = this.getVideo();

    storage = changeStorageChecked(storage, removeData, false);
    localStorage.setItem("saveVideoData", JSON.stringify(storage));
  },
};

export default videoStorage;
