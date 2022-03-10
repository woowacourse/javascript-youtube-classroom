import mockDatas from './utils/mock.js';
import YOUTUBE_DATA_API_KEY from './utils/secret.js';
import { ERROR_MESSAGE, MAX_VIDEO_COUNT } from './constants/contants.js';

class SearchVideo {
  constructor() {
    this.prevSearchKeyword = '';
    this.searchResults = [];
    this.nextPageToken = '';
  }

  async handleSearchVideo(searchKeyword) {
    this.#validateSearchInput(searchKeyword);
    this.searchResults = [...(await this.#getYoutubeVideos(searchKeyword))];
    this.prevSearchKeyword = searchKeyword;
  }

  #getYoutubeVideos = async (searchKeyword) => {
    const url = new URL('youtube/v3/search', 'https://youtube.googleapis.com');
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      maxResults: MAX_VIDEO_COUNT,
      regionCode: 'kr',
      pageToken: this.nextPageToken,
      q: searchKeyword,
      key: YOUTUBE_DATA_API_KEY,
    });
    url.search = params.toString();
    // const response = await fetch(url);
    // if (!response.ok) {
    //   throw new Error(ERROR_MESSAGE.CANNOT_GET_YOUTUBE_VIDEO);
    // }
    // const { items, nextPageToken } = await response.json();
    // this.nextPageToken = nextPageToken;
    // return items;

    const items = mockDatas;
    return new Promise((resolve, reject) => {
      resolve(items);
      reject(ERROR_MESSAGE.CANNOT_GET_YOUTUBE_VIDEO);
    });
  };

  #validateSearchInput = (searchKeyword) => {
    if (!searchKeyword) {
      throw new Error(ERROR_MESSAGE.CANNOT_SEARCH_EMPTY);
    }
  };
}

export default SearchVideo;
