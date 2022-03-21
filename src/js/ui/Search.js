import SearchResult from './SearchResult';
import { skeletonUI } from './loading';
import { store } from '../domain/store';
import { MAX_SEARCH_TEXT_SAVE_COUNT, MESSAGE, STORAGE_KEY } from '../constants';
import { $, $$ } from '../utils/dom';
import { showExceptionSnackBar } from '../utils/snackBar';
import { getRecentSearchButtonTemplate } from './template';

export default class Search {
  constructor() {
    this.input = $('#search-input-keyword');
    this.result = new SearchResult();
    this.#renderRecentSearchText();
    this.#addSubmitEvent();
    this.#addClearButtonClickEvent();
  }

  #saveSearchText(text) {
    const recentSearch = store.getLocalStorage(STORAGE_KEY.RECENT_SEARCH);

    if (!recentSearch || recentSearch.length < MAX_SEARCH_TEXT_SAVE_COUNT) {
      store.setLocalStorage(STORAGE_KEY.RECENT_SEARCH, text);
    } else if (
      !recentSearch.includes(text) &&
      recentSearch.length >= MAX_SEARCH_TEXT_SAVE_COUNT
    ) {
      store.removeLocalStorage(STORAGE_KEY.RECENT_SEARCH);
      recentSearch.push(text);
      recentSearch.slice(1).forEach(text => {
        store.setLocalStorage(STORAGE_KEY.RECENT_SEARCH, text);
      });
    }
  }

  #renderSearchResult(searchText) {
    const $searchResult = $('.search-result');

    $searchResult.replaceChildren();
    $searchResult.insertAdjacentHTML(
      'beforeend',
      '<ul class="video-list"></ul>',
    );
    skeletonUI.render();
    this.result.renderInitialVideoList(searchText);
  }

  #renderRecentSearchText() {
    const $recentSearch = $('.recent-search');
    $recentSearch.replaceChildren();

    const searchText = store.getLocalStorage(STORAGE_KEY.RECENT_SEARCH);
    if (searchText) {
      $recentSearch.insertAdjacentHTML(
        'beforeend',
        getRecentSearchButtonTemplate(searchText),
      );
    }

    $$('.recent-search__button').forEach(button => {
      button.onclick = e => {
        this.reset();
        this.input.value = e.target.innerText;
        this.#renderSearchResult(e.target.innerText);
      };
    });
  }

  #addClearButtonClickEvent() {
    $('.search-input__clear').addEventListener('click', () => {
      this.input.value = '';
      this.input.focus();
    });
  }

  #addSubmitEvent() {
    $('#search-form').addEventListener('submit', e => {
      e.preventDefault();
      if (this.input.value === '') {
        showExceptionSnackBar(MESSAGE.ERROR_BLANK_SEARCH_INPUT);
        return;
      }

      this.#renderSearchResult(this.input.value);

      this.#saveSearchText(this.input.value);
      this.#renderRecentSearchText();
    });
  }

  reset() {
    this.result.resetVideoList();
    this.input.value = '';
  }
}
