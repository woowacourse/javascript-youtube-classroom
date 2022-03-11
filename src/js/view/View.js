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
  constructor() {
    this.searchModalButton = selectDom('#search-modal-button');
    this.modalContainer = selectDom('.modal-container');
    this.searchForm = selectDom('#search-form', this.modalContainer);
    this.searchInputKeyword = selectDom('#search-input-keyword', this.searchForm);

    this.searchResult = selectDom('.search-result', this.modalContainer);
    this.searchResultTitle = selectDom('.search-result-title', this.searchResult);
    this.videoList = selectDom('.video-list', this.searchResult);

    this.#attachEventListeners();
    this.sendSearchRequest = () => {};
    this.sendLoadMoreRequest = () => {};
    this.sendSaveRequest = () => {};
  }

  attachRequestSender(sendSearchRequest, sendLoadMoreRequest, sendSaveRequest) {
    this.sendSearchRequest = sendSearchRequest;
    this.sendLoadMoreRequest = sendLoadMoreRequest;
    this.sendSaveRequest = sendSaveRequest;
  }

  #attachEventListeners() {
    this.requestMoreResult = this.#handleScrollToLastItem();
    this.searchModalButton.addEventListener('click', this.#openModal);
    this.searchForm.addEventListener('submit', this.#handleSearch);
  }

  #openModal = () => {
    this.modalContainer.classList.remove('hide');
  };

  #handleSearch = async (event) => {
    event.preventDefault();
    const { value: keyword } = this.searchInputKeyword;
    if (isBlankValue(keyword)) return;

    this.#clearPreviousRender();

    this.#loadSkeleton();
    try {
      const searchResultArray = await this.sendSearchRequest(keyword);
      this.#renderSearchResult(searchResultArray, keyword);
    } catch (error) {
      this.#renderError(error.message);
    }
  };

  #handleScrollToLastItem() {
    return new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          this.requestMoreResult.unobserve(this.videoList.lastChild);
          this.#loadSkeleton();
          const moreResult = await this.sendLoadMoreRequest();
          this.#renderSearchResult(moreResult);
        }
      },
      { threshold: 0.5 }
    );
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

  #renderSearchResult(searchResultArray, keyword) {
    const skeletonList = this.videoList.querySelectorAll('.skeleton');
    removeElementList(skeletonList);

    if (this.#isEndOfResult(searchResultArray)) return;

    if (keyword) {
      this.searchResultTitle.textContent = `'${keyword}' 검색 결과입니다`;
    }

    const resultElementArray = this.#createElementFromObject(searchResultArray);
    this.videoList.append(...resultElementArray);
    this.requestMoreResult.observe(this.videoList.lastChild);
  }

  #isEndOfResult(searchResultArray) {
    return searchResultArray === null;
  }

  #createElementFromObject(searchResultArray) {
    return searchResultArray.map((resultItem) => this.#createVideoElement(resultItem));
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

  #loadSkeleton() {
    this.videoList.insertAdjacentHTML('beforeend', this.#skeletonTemplate());
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
