import storage from './storage';

class Search {
  constructor() {
    this.keyword = null;
    this.nextPageToken = null;
  }

  async handleSearchRequest(keyword, pageToken = undefined) {
    const { items, nextPageToken } = await this.#getSearchResult(keyword, pageToken);
    this.keyword = keyword;
    this.nextPageToken = nextPageToken;
    const savedVideos = storage.getSavedVideos();
    return { searchResultArray: this.#getVideoObjectArray(items, savedVideos), nextPageToken };
  }

  async handleLoadMoreRequest() {
    if (this.nextPageToken === undefined) return null;
    const { searchResultArray, nextPageToken } = await this.handleSearchRequest(
      this.keyword,
      this.nextPageToken
    );
    this.nextPageToken = nextPageToken;
    return searchResultArray;
  }

  async #getSearchResult(keyword, pageToken) {
    const URL_BASE = 'https://pensive-fermat-630884.netlify.app/youtube/v3/search?part=snippet';
    const query = {
      q: keyword,
      maxResults: 10,
      order: 'viewCount',
      type: 'video',
      regionCode: 'KR',
      pageToken,
    };
    const queryString = this.#generateQueryString(query);
    const response = await fetch(`${URL_BASE}${queryString}`);
    const { items, nextPageToken } = await response.json();
    return { items, nextPageToken };
  }

  #generateQueryString(query) {
    return Object.keys(query).reduce(
      (str, key) => (query[key] ? `${str}&${key}=${query[key]}` : `${str}`),
      ''
    );
  }

  #getVideoObjectArray = (items, savedVideos) =>
    items.map((item) => {
      const { snippet, id } = item;
      return {
        videoId: id.videoId,
        thumbnail: snippet.thumbnails.medium.url,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        isSaved: savedVideos[id.videoId],
      };
    });
}

export default Search;
