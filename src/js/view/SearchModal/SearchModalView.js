import { ERROR_MESSAGES, MAX_SEARCH_RESULT } from '../../constants/constants';
import { isBlankValue, removeElementList, scrollToTop, selectDom } from '../../util/util';
import { errorTemplate, searchVideoElementTemplate } from './SearchModalTemplates';
import Search from '../../domain/Search';
import storage from '../../domain/storage';
import getSkeletonTemplateArray, { removeAllSkeletons } from '../Skeleton';

class SearchModalView {
  constructor() {
    this.modalContainer = selectDom('.modal-container');
    this.searchForm = selectDom('#search-form', this.modalContainer);
    this.searchInputKeyword = selectDom('#search-input-keyword', this.searchForm);
    this.searchResult = selectDom('.search-result', this.modalContainer);
    this.videoList = selectDom('.video-list', this.searchResult);

    this.search = new Search();
    this.sendSaveRequest = storage.saveToStorage;

    this.#attachEventListeners();
  }

  toggleModal = (renderOnModalClose) => {
    const { classList: modalClassList } = this.modalContainer;
    if (modalClassList.contains('hide')) {
      modalClassList.remove('hide');
      return;
    }
    modalClassList.add('hide');
    if (renderOnModalClose) renderOnModalClose();
  };

  #attachEventListeners() {
    this.loadMoreResultObserver = this.#handleScrollToLastItem();
    this.searchForm.addEventListener('submit', this.#handleSearch);
  }

  #handleSearch = async (event) => {
    event.preventDefault();
    const { value: keyword } = this.searchInputKeyword;
    if (isBlankValue(keyword)) {
      alert(ERROR_MESSAGES.NO_SEARCH_KEYWORD);
      return;
    }

    const searchResultTitle = selectDom('.search-result-title', this.searchResult);
    searchResultTitle.textContent = `'${keyword}' 검색 결과입니다`;

    this.#clearPreviousRender();

    this.#sendSearchRequest(keyword);
  };

  #handleScrollToLastItem() {
    return new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          this.loadMoreResultObserver.unobserve(entries[0].target);
          this.#sendSearchRequest();
        }
      },
      { threshold: 0.5 }
    );
  }

  async #sendSearchRequest(keyword) {
    try {
      this.videoList.append(...getSkeletonTemplateArray(MAX_SEARCH_RESULT));
      const { searchResultArray, hasNextPage } = await this.search.handleSearchRequest(keyword);
      this.#renderSearchResult({ searchResultArray, keyword, hasNextPage });
    } catch (error) {
      this.#renderError(error.message, keyword);
    }
  }

  #handleVideoSaveClick = (event) => {
    try {
      this.sendSaveRequest('unwatched', event.target.dataset.videoId);
      event.target.disabled = true;
    } catch (error) {
      alert(error.message);
    }
  };

  #renderSearchResult({ searchResultArray, hasNextPage }) {
    removeAllSkeletons(this.videoList);

    const resultElementArray = searchResultArray.map((resultItem) => {
      const videoElement = searchVideoElementTemplate(resultItem);
      selectDom('.video-item__save-button', videoElement).addEventListener(
        'click',
        this.#handleVideoSaveClick
      );
      return videoElement;
    });
    this.videoList.append(...resultElementArray);
    if (hasNextPage) this.loadMoreResultObserver.observe(this.videoList.lastChild);
  }

  #renderError(errorMessage) {
    this.videoList.classList.add('hide');
    this.searchResult.classList.add('search-result--no-result');
    this.searchResult.append(errorTemplate(errorMessage));
  }

  #clearPreviousRender() {
    this.#clearNoResult();
    scrollToTop(this.videoList);
    removeElementList([...this.videoList.childNodes]);
  }

  #clearNoResult() {
    const noResult = selectDom('.no-result');
    if (noResult) {
      this.videoList.classList.remove('hide');
      this.searchResult.classList.remove('search-result--no-result');
      noResult.remove();
    }
  }
}

export default SearchModalView;
