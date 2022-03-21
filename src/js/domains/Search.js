import SearchVideoStore from '../stores/SearchVideoStore';
import { debounce, fetchData, on, throttle, $ } from '../utils';
import { ERROR_MESSAGE, SEARCH_API } from '../constants';

class Search {
  constructor() {
    this.keyword = '';
    this.nextPageToken = '';

    on({
      selector: '.search-form',
      eventName: '@search',
      handler: debounce((e) => this.search('search', e.detail.keyword)),
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
    $('search-result').showResult();
    $('.video-list', $('search-result')).insertSkeleton(type);

    const videos = await this.fetchVideo(keyword);

    if (videos instanceof Error) return;

    this.keyword = keyword;
    this.nextPageToken = videos.nextPageToken;

    SearchVideoStore.instance.dispatch(type, this.removeDuplicateVideos(this.preprocessor(videos)));
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
      $('.video-list', $('search-result')).removeSkeleton();
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

  removeDuplicateVideos(videos) {
    const searchStoreVideoIds = SearchVideoStore.instance.getVideos().map((video) => video.id);

    return videos.filter((video) => !searchStoreVideoIds.includes(video.id));
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
