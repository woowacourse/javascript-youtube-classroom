import { getTimeStamp } from '@Utils/ManageData';

class YoutubeSaveStorage {
  #STORAGE_NAME = 'YOUTUBE_CLASSROOM_SAVE_VIDEO_LIST';
  #cacheData;

  #getVideoIdToIndex(target) {
    const videoIdList = this.get().map(({ id: videoId }) => videoId);
    return videoIdList.indexOf(target);
  }

  get() {
    if (!this.#cacheData) {
      this.#cacheData = JSON.parse(localStorage.getItem(this.#STORAGE_NAME)) ?? [];
    }

    return this.#cacheData;
  }

  set(updateItems) {
    this.#cacheData = updateItems;
    localStorage.setItem(this.#STORAGE_NAME, JSON.stringify(updateItems));
  }

  add(videoId, videoData) {
    const insertItem = {
      id: videoId,
      content: videoData,
      watched: false,
      updateTime: getTimeStamp(),
    };

    this.set([...this.get(), insertItem]);
  }

  has(videoId) {
    return this.#getVideoIdToIndex(videoId) !== -1;
  }

  remove(videoId) {
    const videoIndex = this.#getVideoIdToIndex(videoId);
    const updateList = this.get();
    updateList.splice(videoIndex, 1);

    this.set(updateList);
  }

  update(videoId, videoData) {
    const videoIndex = this.#getVideoIdToIndex(videoId);
    const updateList = this.get();

    updateList[videoIndex].content = videoData;
    updateList[videoIndex].updateTime = getTimeStamp();

    this.set(updateList);
  }

  watched(videoId, isWatched) {
    const videoIndex = this.#getVideoIdToIndex(videoId);
    const updateList = this.get();

    updateList[videoIndex].watched = isWatched;
    this.set(updateList);
  }
}

export default new YoutubeSaveStorage();
