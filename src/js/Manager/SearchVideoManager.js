import { EVENT, GUIDE_MESSAGE } from '../constants';
import { $ } from '../util';
import { dispatch } from '../util/event';
import fetchYoutubeData from '../util/youtubeAPI';
import { validateSearchKeyword, checkNoUndefinedProperty } from './validation';

export default class SearchVideoManager {
  #keyword;

  #nextPageToken;

  #searchState;

  constructor({ storage }) {
    this.storage = storage;
    this.#keyword = '';
    this.#nextPageToken = '';
    this.#searchState = 'READY';
  }

  updateSearchState (newState, data = {}) {
    this.#searchState = newState;
    const detail = { searchState: newState, ...data };
    dispatch(EVENT.UPDATE_SEARCH_STATE, detail, $('#modal-container'));
  }

  searchWithKeyword(keyword) {
    try {
      validateSearchKeyword(keyword);
    } catch (err) {
      alert(err.message);
      return 
    }
    this.#keyword = keyword;
    this.updateSearchState('READY');
    this.search();
  }

  searchOnScroll() {
    if (!this.#nextPageToken) {
      alert(GUIDE_MESSAGE.NO_MORE_SEARCH_RESULT);
      return;
    }
    this.search();
  }

  search() {
    if ( this.#searchState === 'LOADING' ) return;
    this.updateSearchState('LOADING');
    fetchYoutubeData(this.#keyword, this.#nextPageToken)
      .then((data) => this.processFetchedResult(data))
      .then((fetchedData) => { 
        this.updateSearchState('SUCCESS', { videos: fetchedData });
      }).catch(() => {
        this.updateSearchState('ERROR');
      });
  }

  processFetchedResult(result) {
    this.#nextPageToken = result.nextPageToken;
    return result.items.map((item) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      publishedDate: item.snippet.publishedAt,
      saved: !!this.storage.findVideoById(item.id.videoId),
    })).filter((item) => checkNoUndefinedProperty(item));
  }
}
