import mockDatas from './utils/mock.js';
import YOUTUBE_DATA_API_KEY from './utils/secret.js';

class SearchVideo {
  constructor() {
    this.searchResults = [];
  }

  async handleSearchVideo(searchKeyword) {
    this.#validateSearchInput(searchKeyword);
    this.searchResults = [...await this.#getYoutubeVideos(searchKeyword)];
  }

  #getYoutubeVideos = async (searchKeyword) => {
    const getYoutubeVideosErrorMessage = '[404] 개발자에게 문의하세요';
    // const response = await fetch(
    //   `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchKeyword}&maxResults=10&key=${YOUTUBE_DATA_API_KEY}`
    // );
    // if (!response.ok) {
    //   throw new Error(getYoutubeVideosErrorMessage);
    // }
    // const { items } = await response.json();
    // return items;
    const items = mockDatas;
    return new Promise((resolve, reject) => {
      resolve(items);
      reject(getYoutubeVideosErrorMessage);
    });
  };

  #validateSearchInput = (searchKeyword) => {
    if (!searchKeyword) {
      throw new Error('공백은 검색할 수 없습니다.');
    }
  };
}

export default SearchVideo;
