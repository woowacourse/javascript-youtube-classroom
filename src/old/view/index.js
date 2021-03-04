import { YOUTUBE } from '../../utils/constant.js';
import { $ } from '../../utils/querySelector.js';
import { API_KEY } from '../../utils/index.js';
import localStorage from '../../utils/localStorage.js';
import { setRecentKeywords, setRecentSearchResult } from '../../index.js';

const $inner = $('[data-js=youtube-search-modal__inner]');
const scroll = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight < scrollHeight) {
    return;
  }

  const $skeletonWrapper = $(
    '[data-js=youtube-search-modal__skeleton-wrapper]',
  );

  $skeletonWrapper.classList.remove('d-none');

  const keyword = localStorage.get('recentKeyword');
  const pageToken = localStorage.get('nextPageToken')
    ? `&pageToken=${localStorage.get('nextPageToken')}`
    : '';

  const URL = `/search?&part=snippet${pageToken}&maxResults=${YOUTUBE.NUMBER_TO_LOAD}&q=${keyword}&key=${API_KEY}`;
  const response = await request(URL);
  const recentSearchResult = localStorage.get('recentSearchResult');
  recentSearchResult.push(...response.items);
  localStorage.set('recentSearchResult', recentSearchResult);

  $skeletonWrapper.classList.add('d-none');
  setRecentSearchResult();
};

let timer;
document.addEventListener('scroll', () => {
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      scroll();
    }, 200);
  }
});

export default class SearchModal {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.$form = $('[data-js=youtube-search-modal__form]');
    this.$input = $('[data-js=youtube-search-modal__input]');
    this.$videoWrapper = $('[data-js=youtube-search-modal__video-wrapper]');
    this.$skeletonWrapper = $(
      '[data-js=youtube-search-modal__skeleton-wrapper]',
    );

    this.$form.addEventListener('submit', this.search.bind(this));
    this.$container.addEventListener('click', this.save.bind(this));
  }
}
