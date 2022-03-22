import { ERROR_MESSAGES, MAX_SEARCH_RESULT } from '../../constants/constants';
import { isBlankValue, scrollToTop, selectDom } from '../util/util';
import {
  errorImageTemplate,
  errorTemplate,
  searchVideoElementTemplate,
} from './SearchModalTemplates';
import SearchVideos from '../../domain/SearchVideos';
import { addSkeletonsToContainer, removeAllSkeletons } from '../shared/Skeleton';

class SearchModalView {
  #body;

  #modalContainer;

  #searchInputKeyword;

  #searchResult;

  #videoList;

  #search;

  #observer;

  #errorImage;

  #renderOnModalClose;

  constructor(renderOnModalClose, manageVideoStorage) {
    this.#body = selectDom('body');
    this.#modalContainer = selectDom('.modal-container');
    this.#searchInputKeyword = selectDom('#search-input-keyword');
    this.#searchResult = selectDom('.search-result', this.#modalContainer);
    this.#videoList = selectDom('.video-list', this.#searchResult);
    this.#errorImage = errorImageTemplate();
    this.#renderOnModalClose = renderOnModalClose;
    this.manageVideoStorage = manageVideoStorage;
    this.#search = new SearchVideos(this.manageVideoStorage);
    this.#observer = this.#loadMoreObserver();
    selectDom('#search-form', this.#modalContainer).addEventListener('submit', this.#handleSearch);
    selectDom('#search-modal-button').addEventListener('click', this.#toggleModal);
    selectDom('.dimmer').addEventListener('click', this.#toggleModal);
  }

  #toggleModal = () => {
    this.#body.classList.toggle('modal-open');
    const modalClassList = this.#modalContainer.classList;
    modalClassList.toggle('hide');

    if (modalClassList.contains('hide')) this.#renderOnModalClose();
  };

  #handleSearch = async (event) => {
    event.preventDefault();
    const { value: keyword } = this.#searchInputKeyword;

    if (isBlankValue(keyword)) {
      alert(ERROR_MESSAGES.NO_SEARCH_KEYWORD);
      return;
    }

    this.#renderSearchKeyword(keyword);

    this.#clearPreviousRender();
    this.#sendSearchRequest(keyword);
  };

  #loadMoreObserver() {
    return new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          this.#observer.unobserve(entries[0].target);
          this.#sendSearchRequest();
        }
      },
      { threshold: 0.5 }
    );
  }

  async #sendSearchRequest(keyword) {
    try {
      addSkeletonsToContainer(this.#videoList, MAX_SEARCH_RESULT);
      const { searchResultArray, hasNextPage } = await this.#search.handleSearchRequest(keyword);
      this.#renderSearchResult({ searchResultArray, keyword, hasNextPage });
    } catch (e) {
      this.#renderError(e.message);
    }
  }

  #handleVideoSaveClick = (target, item) => {
    try {
      this.manageVideoStorage.saveToStorage(item);
      target.disabled = true;
    } catch (e) {
      alert(e.message);
    }
  };

  #renderSearchKeyword(keyword) {
    const searchKeyword = selectDom('.search-result-keyword', this.#searchResult);
    searchKeyword.textContent = keyword;
    selectDom('.search-result-title', this.#searchResult).classList.remove('hide');
  }

  #renderSearchResult({ searchResultArray, hasNextPage }) {
    removeAllSkeletons(this.#videoList);
    const resultElementArray = searchResultArray.map((resultItem) => {
      const saveHandler = ({ target }) => this.#handleVideoSaveClick(target, resultItem);
      const videoElement = searchVideoElementTemplate(resultItem);
      selectDom('.video-item__save-button', videoElement).addEventListener('click', saveHandler);
      return videoElement;
    });

    this.#videoList.append(...resultElementArray);
    if (hasNextPage) this.#observer.observe(this.#videoList.lastChild);
  }

  #renderError(errorMessage) {
    removeAllSkeletons(this.#videoList);
    this.#searchResult.classList.add('search-result--no-result');
    this.#videoList.append(errorTemplate(this.#errorImage, errorMessage));
  }

  #clearPreviousRender() {
    this.#clearNoResult();
    scrollToTop(this.#videoList);
    this.#videoList.childNodes.removeAllChildren();
  }

  #clearNoResult() {
    const noResult = selectDom('.no-result');
    if (noResult) {
      this.#videoList.classList.remove('hide');
      this.#searchResult.classList.remove('search-result--no-result');
      noResult.remove();
    }
  }
}

export default SearchModalView;
