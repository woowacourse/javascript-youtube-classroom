import VideoStore from '../VideoStore';
import { fetchData, on, throttle, $ } from '../utils';
import { ERROR_MESSAGE, SEARCH_API } from '../constants';

class Search {
  // eslint-disable-next-line max-lines-per-function
  constructor() {
    this.keyword = '';
    this.nextPageToken = '';

    on({
      selector: '.search-form',
      eventName: '@search',
      handler: throttle((e) => this.search('search', e.detail.keyword), 500),
      component: $('search-form'),
    });
    on({
      selector: '.video-list',
      eventName: '@scroll',
      handler: throttle(() => this.search('scroll')),
      component: $('search-result'),
    });
  }

  async search(type, keyword = this.keyword) {
    $('.video-list', $('search-result')).resetResult(type);
    $('.video-list', $('search-result')).insertSkeleton(type);

    const videos = await this.fetchVideo(keyword);

    this.keyword = keyword;
    this.nextPageToken = videos.nextPageToken ?? '';

    VideoStore.instance.dispatch(type, this.preprocessor(videos));
  }

  async fetchVideo(keyword) {
    try {
      SEARCH_API.URL.search = this.#generateSearchParams(keyword);
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

  #generateSearchParams(keyword) {
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
