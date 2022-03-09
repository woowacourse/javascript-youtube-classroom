import { on, $ } from '../utils';
import SEARCH_API from '../constants';

class Search {
  constructor() {
    this.subscribeEvents();
    this.keyword = '';
    this.nextPageToken = '';
  }

  subscribeEvents() {
    on('form', '@search', (e) => this.search('search', e.detail.keyword), $('search-form'));
    on('.video-list', '@scroll', () => this.search('scroll'), $('search-result'));
  }

  // eslint-disable-next-line max-lines-per-function
  async search(type, keyword = this.keyword) {
    const videos = await this.fetchVideo(keyword);

    this.keyword = keyword;
    this.nextPageToken = videos.nextPageToken;
    $('search-result').notify(
      type,
      videos.items.map((item) => {
        return {
          id: item.id.videoId,
          thumbnail: encodeURI(item.snippet.thumbnails.default.url),
          title: encodeURI(item.snippet.title),
          channelTitle: encodeURI(item.snippet.channelTitle),
          publishedAt: item.snippet.publishedAt,
        };
      })
    );
  }

  // eslint-disable-next-line max-lines-per-function
  async fetchVideo(keyword) {
    try {
      SEARCH_API.URL.search = new URLSearchParams({
        ...SEARCH_API.PARAMS,
        pageToken: this.nextPageToken,
        q: keyword,
      }).toString();

      const response = await fetch(SEARCH_API.URL, { method: 'GET' });
      const body = await response.json();

      if (!response.ok) throw new Error(body.error.message);

      return body;
    } catch (error) {
      return error;
    }
  }
}

export default Search;
