import VideoStore from '../VideoStore';
import { on, $, fetchData } from '../utils';
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

  async fetchVideo(keyword) {
    try {
      SEARCH_API.URL.search = this.generateSearchParams(keyword);
      const response = await fetchData(SEARCH_API.URL);

      if (response instanceof Error) {
        throw new Error(ERROR_MESSAGE.FAIL_TO_REQUEST_API);
      }

      return response;
    } catch (error) {
      alert(error.message);
      return error;
    }
  }

  generateSearchParams(keyword) {
    return new URLSearchParams({
      ...SEARCH_API.PARAMS,
      pageToken: this.nextPageToken,
      q: keyword,
    }).toString();
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
