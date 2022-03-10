import VideoStore from '../VideoStore';
import { on, $ } from '../utils';
import { ERROR_MESSAGE, SEARCH_API } from '../constants';

class Search {
  constructor() {
    this.subscribeEvents();
    this.keyword = '';
    this.nextPageToken = '';
  }

  subscribeEvents() {
    on('form', '@search', (e) => this.search('search', e.detail.keyword), $('search-form'));
    on('ul', '@scroll', () => this.search('scroll'), $('search-result'));
  }

  async search(type, keyword = this.keyword) {
    $('ul', $('search-result')).insertSkeleton();

    const videos = await this.fetchVideo(keyword);

    this.keyword = keyword;
    this.nextPageToken = videos.nextPageToken ? videos.nextPageToken : '';

    VideoStore.instance.dispatch(type, this.preprocessor(videos));
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

      if (!response.ok) throw new Error(ERROR_MESSAGE.FAIL_TO_REQUEST_API);

      return body;
    } catch (error) {
      alert(error.message);
      return error;
    }
  }

  preprocessor(videos) {
    return videos.items.map((item) => {
      return {
        id: item.id.videoId,
        thumbnail: encodeURI(item.snippet.thumbnails.default.url),
        title: encodeURI(item.snippet.title),
        channelTitle: encodeURI(item.snippet.channelTitle),
        publishedAt: item.snippet.publishedAt,
      };
    });
  }
}

export default Search;
