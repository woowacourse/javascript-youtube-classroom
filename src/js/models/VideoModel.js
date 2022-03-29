import { checkLengthExist, checkEmpty, checkEmptyApi } from '../utils/validator';
import SERVER from '../../constants/server.js';

export default class VideoModel {
  #keyword;

  #fetchedVideos;

  #newVideoItems;

  #allVideoItems = [];

  #nextPageToken;

  #savedVideoItems;

  constructor(dummyObject = {}) {
    this.#fetchedVideos = dummyObject; // API 사용량 초과될 경우, 데모 확인을 위해 dummyObject가 기본으로 할당된다.
    this.savedIdList = [];
    this.#savedVideoItems = [];
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

  resetAllVideoItems() {
    this.#allVideoItems = [];
  }

  accumulateVideoItems() {
    this.#allVideoItems = [...this.#allVideoItems, ...this.#newVideoItems];
  }

  setItemsLocalStorage(savedId) {
    this.#allVideoItems.some((item) => {
      console.log('도는중');
      if (item.videoId === savedId) {
        item.saved = true;
        const allSavedVideoItems = [...this.#savedVideoItems, item];
        this.#savedVideoItems = allSavedVideoItems;
        localStorage.setItem('saved-video', JSON.stringify(allSavedVideoItems));
      }
      return item.videoId === savedId;
    });
  }

  getItemsLocalStorage() {
    return JSON.parse(localStorage.getItem('saved-video')) ?? [];
  }

  updateItemsLocalStorage() {
    localStorage.setItem('saved-video', JSON.stringify(this.#savedVideoItems));
  }

  deleteVideo(deleteVideoId) {
    this.#savedVideoItems.some((item, idx) => {
      console.log('삭제');
      if (item.videoId === deleteVideoId) {
        this.#savedVideoItems.splice(idx, 1);
      }
      return item.videoId === deleteVideoId;
    });
  }

  isIncludedSavedItem(newItem) {
    let isfindSavedItem = false;
    for (const savedItem of this.#savedVideoItems) {
      if (newItem.videoId === savedItem.videoId) {
        isfindSavedItem = true;
        return savedItem;
      }
    }
    return isfindSavedItem || newItem;
  }

  updateNewVideoItems() {
    const updatedNewVideoItems = this.#newVideoItems.map((newItem) => {
      return this.isIncludedSavedItem(newItem);
    });

    if (updatedNewVideoItems.length) {
      this.#newVideoItems = updatedNewVideoItems;
    }
  }

  setVideoInfo() {
    this.#newVideoItems = this.#fetchedVideos.items.map((item) => ({
      videoId: item.id.videoId,
      description: item.snippet.description,
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      publishTime: item.snippet.publishTime,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      saved: false,
      saw: false,
    }));
    checkLengthExist(this.#newVideoItems);

    this.#nextPageToken = this.#fetchedVideos.nextPageToken;
  }

  updateSawAttribute(sawVideoId) {
    for (const video of this.#savedVideoItems) {
      if (video.videoId === sawVideoId) {
        video.saw = !video.saw;
        return;
      }
    }
  }

  async fetchYoutubeApi(query, nextPageToken) {
    try {
      const url = new URL('youtube/v3/search', SERVER.REDIRECT_HOST2);
      const parameters = new URLSearchParams({
        part: 'snippet',
        type: 'video',
        maxResults: 10,
        regionCode: 'kr',
        safeSearch: 'strict',
        pageToken: nextPageToken || '',
        q: query,
      });
      url.search = parameters.toString();

      const response = await fetch(url, { method: 'GET' });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(response.status);
      }

      this.#fetchedVideos = body;
    } catch (error) {
      checkEmptyApi(error);
    }
  }
}
