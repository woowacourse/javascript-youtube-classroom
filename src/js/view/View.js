import {
  formatDateString,
  isBlankValue,
  removeElementList,
  selectDom,
  scrollToTop,
} from '../util/util';
import { MAX_SEARCH_RESULT } from '../constants/constants';
import '../../assets/images/not_found.png';

class View {
  constructor(search, saveVideos) {
    this.searchModalButton = selectDom('#search-modal-button');
    this.modalContainer = selectDom('.modal-container');
    this.dimmer = selectDom('.dimmer', this.modalContainer);
    this.searchForm = selectDom('#search-form', this.modalContainer);
    this.searchInputKeyword = selectDom('#search-input-keyword', this.searchForm);
    this.searchResult = selectDom('.search-result', this.modalContainer);
    this.searchResultTitle = selectDom('.search-result-title', this.searchResult);
    this.videoList = selectDom('.video-list', this.searchResult);

    this.#attachEventListeners();
    this.search = search;
    this.sendSaveRequest = saveVideos;
  }

  #attachEventListeners() {
    this.lastItemOfListObserver = this.#handleScrollToLastItem();
    this.searchModalButton.addEventListener('click', this.#toggleModal);
    this.searchForm.addEventListener('submit', this.#handleSearch);
    this.dimmer.addEventListener('click', this.#toggleModal);
  }

  #toggleModal = () => {
    const { classList: modalClassList } = this.modalContainer;
    if (modalClassList.contains('hide')) {
      modalClassList.remove('hide');
      return;
    }
    modalClassList.add('hide');
  };

  #handleSearch = async (event) => {
    event.preventDefault();
    const { value: keyword } = this.searchInputKeyword;
    if (isBlankValue(keyword)) return;

    this.#clearPreviousRender();

    this.#sendSearchRequest(keyword);
  };

  #handleScrollToLastItem() {
    return new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          this.lastItemOfListObserver.unobserve(entries[0].target);
          this.#sendSearchRequest();
        }
      },
      { threshold: 0.5 }
    );
  }

  async #sendSearchRequest(keyword) {
    try {
      this.videoList.insertAdjacentHTML('beforeend', this.#skeletonTemplate());
      const { searchResultArray, hasNextPage } = await this.search.handleSearchRequest(keyword);
      this.#renderSearchResult({ searchResultArray, keyword, hasNextPage });
    } catch (error) {
      this.#renderError(error.message);
    }
  }

  #handleVideoSaveClick = (event) => {
    try {
      this.sendSaveRequest(event.target.dataset.videoId);
      event.target.disabled = true;
    } catch (error) {
      alert(error.message);
    }
  };

  #clearPreviousRender() {
    this.#clearNoResult();
    scrollToTop(this.videoList);
    removeElementList([...this.videoList.childNodes]);
  }

  #renderSearchResult({ searchResultArray, keyword, hasNextPage }) {
    const skeletonList = this.videoList.querySelectorAll('.skeleton');
    removeElementList(skeletonList);
    if (keyword) {
      this.searchResultTitle.textContent = `'${keyword}' 검색 결과입니다`;
    }

    const resultElementArray = searchResultArray.map((resultItem) =>
      this.#createVideoElement(resultItem)
    );

    this.videoList.append(...resultElementArray);
    if (hasNextPage) this.lastItemOfListObserver.observe(this.videoList.lastChild);
  }

  #createVideoElement(resultItem) {
    const videoElement = document.createElement('li');
    videoElement.className = 'video-item';
    videoElement.insertAdjacentHTML('beforeend', this.#videoElementTemplate(resultItem));
    selectDom('.video-item__save-button', videoElement).addEventListener(
      'click',
      this.#handleVideoSaveClick
    );
    return videoElement;
  }

  #videoElementTemplate({ thumbnail, title, channelTitle, publishedAt, videoId, isSaved }) {
    return `<img src="${thumbnail}" alt="video-item-thumbnail" class="video-item__thumbnail">
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${formatDateString(publishedAt)}</p>
    <button 
      ${isSaved && 'disabled'}
      class="video-item__save-button button"
      data-video-id="${videoId}"
    >
      ⬇ 저장
    </button>`;
  }

  #skeletonTemplate() {
    return `<div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>`.repeat(MAX_SEARCH_RESULT);
  }

  #renderError(errorMessage) {
    this.videoList.classList.add('hide');
    this.searchResult.classList.add('search-result--no-result');
    this.searchResult.insertAdjacentHTML(
      'beforeend',
      `<div class="no-result">
        <img src="./not_found.png" alt="no result image" class="no-result__image">
        <p class= "no-result__description">
          ${errorMessage}
        </p>
      </div>`
    );
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

export default View;
