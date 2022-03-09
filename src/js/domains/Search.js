import VideoStore from '../VideoStore';
import { on, $ } from '../utils';
import SEARCH_API from '../constants';

class Search {
  constructor() {
    this.subscribeEvents();
  }

  subscribeEvents() {
    on('form', '@search', (e) => this.search(e.detail.keyword), $('search-form'));
  }

  async search(keyword) {
    const videos = await this.fetchVideo(keyword);

    VideoStore.instance.dispatch(
      videos.items.map((item) => {
        return {
          id: item.id.videoId,
          thumbnail: item.snippet.thumbnails.default.url,
          title: encodeURI(item.snippet.title),
          channelTitle: encodeURI(item.snippet.channelTitle),
          publishedAt: item.snippet.publishedAt,
        };
      })
    );
  }

  async fetchVideo(keyword) {
    try {
      SEARCH_API.URL.search = new URLSearchParams({ ...SEARCH_API.PARAMS, q: keyword }).toString();

      const response = await fetch(SEARCH_API.URL, { method: 'GET' });
      const body = await response.json();

      if (!response.ok) throw new Error(body.error.message);

      return body;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export default Search;
