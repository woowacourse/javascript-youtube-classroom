import { ERROR_MESSAGES, MAX_SEARCH_RESULT } from '../../constants/constants';
import { isBlankValue, removeElementList, scrollToTop, selectDom } from '../util/util';
import {
  errorImageTemplate,
  errorTemplate,
  searchVideoElementTemplate,
} from './SearchModalTemplates';
import Search from '../../domain/Search';
import { addSkeletonsToContainer, removeAllSkeletons } from '../shared/Skeleton';
import { saveToStorage } from '../../domain/storage';

class SearchModalView {
  #modalContainer;

  #searchForm;

  #searchInputKeyword;

  #searchResult;

  #videoList;

  #search;

  #observer;

  #errorImage;

  constructor() {
    this.#modalContainer = selectDom('.modal-container');
    this.#searchForm = selectDom('#search-form', this.#modalContainer);
    this.#searchInputKeyword = selectDom('#search-input-keyword', this.#searchForm);
    this.#searchResult = selectDom('.search-result', this.#modalContainer);
    this.#videoList = selectDom('.video-list', this.#searchResult);

    this.#search = new Search();

    this.#observer = this.#loadMoreObserver();
    this.#searchForm.addEventListener('submit', this.#handleSearch);

    this.#errorImage = errorImageTemplate();
  }

  toggleModal = (renderOnModalClose) => {
    const modalClassList = this.#modalContainer.classList;
    modalClassList.toggle('hide');

    if (modalClassList.contains('hide') && renderOnModalClose) renderOnModalClose();
  };

  #handleSearch = async (event) => {
    event.preventDefault();
    const { value: keyword } = this.#searchInputKeyword;
    if (isBlankValue(keyword)) {
      alert(ERROR_MESSAGES.NO_SEARCH_KEYWORD);
      return;
    }

    const searchResultTitle = selectDom('.search-result-title', this.#searchResult);
    const formattedKeyword = keyword.length > 15 ? `${keyword.slice(0, 12)}...` : keyword;
    searchResultTitle.textContent = `'${formattedKeyword}' 검색 결과입니다`;

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

  #handleVideoSaveClick = (event, item) => {
    try {
      saveToStorage(item);
      event.target.disabled = true;
    } catch (e) {
      alert(e.message);
    }
  };

  #renderSearchResult({ searchResultArray, hasNextPage }) {
    removeAllSkeletons(this.#videoList);
    const resultElementArray = searchResultArray.map((resultItem) => {
      const saveHandler = (event) => this.#handleVideoSaveClick(event, resultItem);
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
    removeElementList([...this.#videoList.childNodes]);
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
