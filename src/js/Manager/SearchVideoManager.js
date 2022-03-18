import { EVENT, GUIDE_MESSAGE, MAX_DATA_FETCH_AT_ONCE } from '../constants';
import Storage from '../Storage';
import { addListener, dispatch } from '../util/event';
import { validateSearchKeyword, checkNoUndefinedProperty } from './validation';

const DUMMY_YOUTUBE_API_URL = 'https://elastic-goldstine-10f16a.netlify.app/dummy/youtube/v3/search?';
const YOUTUBE_API_URL = 'https://elastic-goldstine-10f16a.netlify.app/youtube/v3/search?';
const WRONG_API_URL = 'https://elastic-goldstine-10f16a.netlify.appppp/search?';

const generateFetchURL = (keyword, nextPageToken) => {
  const searchParams = new URLSearchParams();
  searchParams.append('part', 'snippet');
  searchParams.append('q', keyword);
  searchParams.append('maxResults', MAX_DATA_FETCH_AT_ONCE);
  if (nextPageToken) {
    searchParams.append('pageToken', nextPageToken);
  }
  return DUMMY_YOUTUBE_API_URL + searchParams.toString();
}

export default class SearchVideoManager {
  #keyword;

  #nextPageToken;

  #searchState;

  constructor() {
    this.#keyword = '';
    this.#nextPageToken = '';
    this.#searchState = 'READY';

    addListener(EVENT.SEARCH_WITH_NEW_KEYWORD, this.searchWithNewKeyword.bind(this));
    addListener(EVENT.SEARCH_ON_SCROLL, this.searchOnScroll.bind(this));
  }

  updateSearchState(newState, data = {}) {
    this.#searchState = newState;
    const detail = { searchState: newState, ...data };
    dispatch(EVENT.UPDATE_SEARCH_STATE, detail);
  }

  searchWithNewKeyword(e) {
    const { keyword } = e.detail;
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
    this.fetchYoutubeData()
      .then((data) => this.processFetchedResult(data))
      .then((fetchedData) => { 
        this.updateSearchState('SUCCESS', { videos: fetchedData });
      }).catch(() => {
        this.updateSearchState('ERROR');
      });
  }

  fetchYoutubeData() {
    return fetch(generateFetchURL(this.#keyword, this.#nextPageToken))
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
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
      saved: !!Storage.findVideoById(item.id.videoId),
    })).filter((item) => checkNoUndefinedProperty(item));
  }
}
