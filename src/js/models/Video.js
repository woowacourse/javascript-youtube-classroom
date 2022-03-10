export default class Video {
  #keyword;

  #fetchedVideos; // 10개 거칠딘~ 가공되지 않은

  #newVideoItems; // 길이가 10개인 array

  #allVideoItems = [];

  #nextPageToken; // 다음 토큰 string

  #newSavedIdList;

  constructor(dummyObject) {
    this.#fetchedVideos = dummyObject;
    this.savedIdList = [];
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

  set newSavedIdList(newSavedIdList) {
    this.#newSavedIdList = newSavedIdList;
  }

  accumulateVideoItems() {
    this.#allVideoItems = [...this.#allVideoItems, ...this.#newVideoItems];
    console.log(this.#allVideoItems);
  }

  setItemsLocalStorage(newSavedIdList) {
    this.video.newSavedIdList(newSavedIdList);
    // id의 배열 -> fethcAllData -> [{videoId: , title: },]
    // local 저장
  }

  getItemsLocalStorage() {}

  // id 배열 newSavedIdList, -> newVideoItems
  updateVideoItems() {
    this.#newSavedIdList; // ['id','']
    this.#newVideoItems; // [{videoId: , title: },{}]
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
      const REDIRECT_SERVER_HOST = 'https://stupefied-turing-eea71d.netlify.app/'; // my own redirect server hostname

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
