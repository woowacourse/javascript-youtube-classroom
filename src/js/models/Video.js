import { checkLengthExist, checkEmpty } from '../utils/validator';

export default class Video {
  #keyword; // 검색어

  #fetchedVideos; // length:10, type:array, fetch한 원본(items, nextPageToken)

  #newVideoItems; //  length:10, type:array, search해서 첫 10개, 스크롤 때마다 10개 추가되는 items (origin: #fetchedVideos), saved 속성이 바뀌면 override가 된다.

  #allVideoItems = []; // length:미상, type:array, 스크롤할 때마다 해당 newVideoItems 10개씩 누적되는 items

  #nextPageToken; // fetch하기 위한 다음 페이지 Token (origin: #fetchedVideos)

  #savedVideoItems; // length:미상(최대100), type:array,저장된 비디오 items, localStorage 상호작용

  constructor() {
    this.savedIdList = [];
    this.#savedVideoItems = this.getItemsLocalStorage();
  }

  set keyword(value) {
    checkEmpty(value);
    this.#keyword = value;
  }

  get keyword() {
    return this.#keyword;
  }

  get nextPageToken() {
    return this.#nextPageToken;
  }

  get newVideoItems() {
    checkLengthExist(this.#newVideoItems);
    return this.#newVideoItems;
  }

  get savedVideoItems() {
    return this.#savedVideoItems;
  }

  set savedVideoItems(items) {
    this.#savedVideoItems = items;
  }

  accumulateVideoItems() {
    this.#allVideoItems = [...this.#allVideoItems, ...this.#newVideoItems];
  }

  setItemsLocalStorage(savedId) {
    for (const item of this.#allVideoItems) {
      if (item.videoId === savedId) {
        item.saved = true;
        const allSavedVideoItems = [...this.#savedVideoItems, item];
        this.#savedVideoItems = allSavedVideoItems;
        localStorage.setItem('saved-video', JSON.stringify(allSavedVideoItems));
        return;
      }
    }
  }

  getItemsLocalStorage() {
    return JSON.parse(localStorage.getItem('saved-video')) ?? [];
  }

  updateNewVideoItems() {
    const updatedNewVideoItems = [];
    for (const newItem of this.#newVideoItems) {
      const savedNewItem = this.#getSavedNewItem(newItem);
      updatedNewVideoItems.push(savedNewItem);
    }

    if (updatedNewVideoItems.length) {
      this.#newVideoItems = updatedNewVideoItems;
    }
  }

  #getSavedNewItem(newItem) {
    for (const savedItem of this.#savedVideoItems) {
      if (newItem.videoId === savedItem.videoId) {
        return savedItem;
      }
    }
    return newItem;
  }

  setVideoInfo(fetchedVideos) {
    checkLengthExist(fetchedVideos.items);

    this.#newVideoItems = fetchedVideos.items.map((item) => ({
      videoId: item.id.videoId,
      description: item.snippet.description,
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      publishTime: item.snippet.publishTime,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      saved: false,
      watched: false,
    }));

    this.#nextPageToken = fetchedVideos.nextPageToken;
  }

  #saveLocalStorage() {
    localStorage.setItem('saved-video', JSON.stringify(this.savedVideoItems));
  }

  setWatchedVideoItem(watchedVideoId) {
    this.savedVideoItems = this.#savedVideoItems.map((item) => {
      const newItem = item;
      if (newItem.videoId === watchedVideoId) {
        newItem.watched = true;
      }
      return newItem;
    });

    this.#saveLocalStorage();
  }

  setUnwatchedVideoItem(watchedVideoId) {
    this.savedVideoItems = this.#savedVideoItems.map((item) => {
      const newItem = item;
      if (newItem.videoId === watchedVideoId) {
        newItem.watched = false;
      }
      return newItem;
    });

    this.#saveLocalStorage();
  }

  setDeletedVideoItem(deletedVideoId) {
    this.savedVideoItems = this.#savedVideoItems.filter((item) => item.videoId !== deletedVideoId);

    this.#saveLocalStorage();
  }

  getVideoTitleBy(videoId) {
    return this.#savedVideoItems.find((item) => item.videoId === videoId).title;
  }
}
