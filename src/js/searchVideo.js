import { ERROR_MESSAGE, GET_VIDEO_COUNT, REDIRECT_SERVER_HOST } from './constants/contants.js';

class SearchVideo {
  constructor() {
    this.prevSearchKeyword = '';
    this.nextPageToken = '';
  }

  async handleSearchVideo(searchKeyword) {
    this.#validateSearchInput(searchKeyword);
    this.prevSearchKeyword = searchKeyword;
    return await this.#getYoutubeVideos(searchKeyword);
  }

  #getYoutubeVideos = async (searchKeyword) => {
    const url = new URL('youtube/v3/search', REDIRECT_SERVER_HOST);
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      maxResults: GET_VIDEO_COUNT,
      regionCode: 'kr',
      pageToken: this.nextPageToken || '',
      q: searchKeyword,
    });
    url.search = params.toString();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.CANNOT_GET_YOUTUBE_VIDEO);
    }
    const { items, nextPageToken } = await response.json();
    this.nextPageToken = nextPageToken;
    return items;
  };

  #validateSearchInput = (searchKeyword) => {
    if (!searchKeyword) {
      throw new Error(ERROR_MESSAGE.CANNOT_SEARCH_EMPTY);
    }
  };
}

export default SearchVideo;
