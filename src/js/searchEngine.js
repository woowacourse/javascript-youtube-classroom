import fetch from 'node-fetch';

export default class SearchEngine {
  #pageToken = null;

  get pageToken() {
    return this.#pageToken;
  }

  set pageToken(pageToken) {
    this.#pageToken = pageToken;
  }

  async searchKeyword(keyword) {
    const YOUTUBE_API_URL = this.#getYoutubeApiUrl(keyword);

    const response = await fetch(YOUTUBE_API_URL);

    if (response.ok) {
      const json = await response.json();
      this.#pageToken = json.pageToken;

      return this.isDataExist(json) ? json.items : null;
    }

    throw Error('유튜브 검색 기능이 정상 작동되지 않았습니다.');
  }

  isDataExist(data) {
    return Object.keys(data.items[0]).includes('snippet');
  }

  #getYoutubeApiUrl(keyword) {
    let YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?type=video&key=${process.env.YOUTUBE_API_KEY}&q=${keyword}&part=snippet&maxResults=10`;

    if (this.#pageToken) {
      YOUTUBE_API_URL += `&pageToken=${this.#pageToken}`;
    }

    return YOUTUBE_API_URL;
  }
}
