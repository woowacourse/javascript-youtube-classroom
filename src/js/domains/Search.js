import { on, $ } from '../utils';
import SEARCH_API from '../constants';

class Search {
  constructor() {
    this.subscribeEvents();
  }

  subscribeEvents() {
    on('form', '@search', (e) => this.search(e.detail.keyword), $('search-form'));
  }

  search(keyword) {
    this.fetchVideo(keyword).then((body) => {
      console.log(body);
    });
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
