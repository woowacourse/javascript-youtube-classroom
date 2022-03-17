import { getTimeStamp } from '@Utils/ManageData';

class YoutubeSaveStorage {
  #STORAGE_NAME = 'YOUTUBE_CLASSROOM_SAVE_VIDEO_LIST';

  #getVideoIdToIndex(target) {
    const videoIdList = this.get().map(({ id: videoId }) => videoId);
    return videoIdList.indexOf(target);
  }

  get() {
    const item = localStorage.getItem(this.#STORAGE_NAME) ?? '[]';
    return JSON.parse(item);
  }

  add(videoId, videoData) {
    const insertItem = {
      id: videoId,
      content: videoData,
      watched: false,
      updateTime: getTimeStamp(),
    };

    localStorage.setItem(this.#STORAGE_NAME, JSON.stringify([...this.get(), insertItem]));
  }

  has(videoId) {
    return this.#getVideoIdToIndex(videoId) !== -1;
  }

  remove(videoId) {
    const videoIndex = this.#getVideoIdToIndex(videoId);
    const updateList = this.get();
    updateList.splice(videoIndex, 1);

    localStorage.setItem(this.#STORAGE_NAME, JSON.stringify(updateList));
  }
}

export default new YoutubeSaveStorage();
