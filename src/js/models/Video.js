import { checkLengthExist, checkEmpty } from '../utils/validator';

export default class Video {
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
      let isfindSavedItem = false;
      for (const savedItem of this.#savedVideoItems) {
        if (newItem.videoId === savedItem.videoId) {
          isfindSavedItem = true;
          updatedNewVideoItems.push(savedItem);
          break;
        }
      }
      if (isfindSavedItem === false) {
        updatedNewVideoItems.push(newItem);
      }
    }

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
    }));
    checkLengthExist(this.#newVideoItems);

    this.#nextPageToken = this.#fetchedVideos.nextPageToken;
  }

  async fetchYoutubeApi(query, nextPageToken) {
    try {
      const REDIRECT_SERVER_HOST = 'https://thirsty-ritchie-0c8419.netlify.app/';

      const url = new URL('youtube/v3/search', REDIRECT_SERVER_HOST);
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
        throw new Error(body.error.message);
      }

      this.#fetchedVideos = body;
    } catch (error) {
      console.error(error);
    }
  }
}
