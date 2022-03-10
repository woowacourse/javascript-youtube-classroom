/* eslint-disable max-depth */
/* eslint-disable no-unreachable-loop */
export default class Video {
  #keyword; // 검색어

  #fetchedVideos; // length:10, type:array, fetch한 원본(items, nextPageToken)

  #newVideoItems; //  length:10, type:array, search해서 첫 10개, 스크롤 때마다 10개 추가되는 items (orgin: #fetchedVideos), svaed 속성이 바뀌면 override가 된다.

  #allVideoItems = []; // length:미상, type:array, 스크롤할 때마다 해당 newVideoItems 10개씩 누적되는 items

  #nextPageToken; // fetch하기 위한 다음 페이지 Token (orgin: #fetchedVideos)

  #savedVideoItems; // length:미상(최대100), type:array,저장된 비디오 items, localStorage 상호작용

  constructor(dummyObject) {
    this.#fetchedVideos = dummyObject;
    this.savedIdList = [];
    this.#savedVideoItems = this.getItemsLocalStorage();
    console.log(this.#savedVideoItems);
  }

  set keyword(value) {
    this.#keyword = value;
  }

  get keyword() {
    return this.#keyword;
  }

  get nextPageToken() {
    return this.#nextPageToken;
  }

  get newVideoItems() {
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
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      publishTime: item.snippet.publishTime,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      saved: false,
    }));
    this.#nextPageToken = this.#fetchedVideos.nextPageToken;
  }

  async fetchYoutubeApi(query, nextPageToken) {
    // const nextPageToken = 'CAoQAA';
    // const query = '우아한테크코스';
    // 마르코 API 서버 주소: https://priceless-euclid-bf53ed.netlify.app/
    // 마르코 API 서버2 주소: https://zealous-swartz-f699df.netlify.app/
    // 마르코 API 서버 3 주소: https://stupefied-turing-eea71d.netlify.app/
    // 위니 API 서버 주소: https://thirsty-ritchie-0c8419.netlify.app/

    try {
      // const ORIGINAL_HOST = "https://www.googleapis.com"; // 기존 유튜브 API 호스트
      const REDIRECT_SERVER_HOST = 'https://zealous-swartz-f699df.netlify.app/'; // my own redirect server hostname

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
