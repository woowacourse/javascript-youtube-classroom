import { checkLengthExist, checkEmpty } from '../utils/validator';

export default class Video {
  #keyword; // 검색어

  #fetchedVideos; // length:10, type:array, fetch한 원본(items, nextPageToken)

  #newVideoItems; //  length:10, type:array, search해서 첫 10개, 스크롤 때마다 10개 추가되는 items (orgin: #fetchedVideos), svaed 속성이 바뀌면 override가 된다.

  #allVideoItems = []; // length:미상, type:array, 스크롤할 때마다 해당 newVideoItems 10개씩 누적되는 items

  #nextPageToken; // fetch하기 위한 다음 페이지 Token (orgin: #fetchedVideos)

  #savedVideoItems; // length:미상(최대100), type:array,저장된 비디오 items, localStorage 상호작용

  constructor(dummyObject = {}) {
    this.#fetchedVideos = dummyObject;
    this.savedIdList = [];
    this.#savedVideoItems = [];
    console.log(this.#savedVideoItems);
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

  accumulateVideoItems() {
    this.#allVideoItems = [...this.#allVideoItems, ...this.#newVideoItems];
    console.log(this.#allVideoItems);
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
