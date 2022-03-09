import { getSavedVideos } from '../util/storage';

class View {
  constructor() {
    this.searchModalButton = document.querySelector('#search-modal-button');
    this.modalContainer = document.querySelector('.modal-container');
    this.searchInputKeyword = document.querySelector('#search-input-keyword');
    this.searchForm = document.querySelector('#search-form');
    this.videoList = document.querySelector('.video-list');
    this.requestMoreResult = this.#getNewObserver();

    this.searchModalButton.addEventListener('click', this.#openModal);
    this.searchForm.addEventListener('submit', this.#handleSearch);
    this.sendSearchRequest = () => {};
    this.sendLoadMoreRequest = () => {};
    this.sendSaveRequest = () => {};
  }

  attachHandler(searchHandler, loadMoreHandler, saveHandler) {
    this.sendSearchRequest = searchHandler;
    this.sendLoadMoreRequest = loadMoreHandler;
    this.sendSaveRequest = saveHandler;
  }

  #openModal = () => {
    this.modalContainer.classList.remove('hide');
  };

  #formatDateString(dateTimeString) {
    const date = new Date(dateTimeString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  }

  #isStored(videoId) {
    return getSavedVideos()[videoId];
  }

  #videoElementTemplate({ thumbnail, title, channelTitle, publishedAt, videoId }) {
    return `<img src="${thumbnail}" alt="video-item-thumbnail" class="video-item__thumbnail">
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${this.#formatDateString(publishedAt)}</p>
    <button 
      ${this.#isStored(videoId) && 'disabled'}
      class="video-item__save-button button"
      data-video-id="${videoId}"
    >
      ⬇ 저장
    </button>`;
  }

  #createVideoElement = (resultItem) => {
    const videoElement = document.createElement('li');
    videoElement.className = 'video-item';
    videoElement.insertAdjacentHTML('beforeend', this.#videoElementTemplate(resultItem));
    videoElement
      .querySelector('.video-item__save-button')
      .addEventListener('click', this.#handleVideoSaveClick);
    return videoElement;
  };

  #handleVideoSaveClick = (event) => {
    this.sendSaveRequest(event.target.dataset.videoId);
    event.target.disabled = true;
  };

  #getNewObserver() {
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

  #createElementFromObject(searchResultArray) {
    return searchResultArray.map((resultItem) => this.#createVideoElement(resultItem));
  }

  #removeElements(nodeList) {
    nodeList.forEach((skeleton) => skeleton.remove());
  }

  #renderSearchResult = (searchResultArray) => {
    const skeletonList = this.videoList.querySelectorAll('.skeleton');
    if (searchResultArray === null) {
      this.#removeElements(skeletonList);
      return;
    }
    const resultElementArray = this.#createElementFromObject(searchResultArray);
    this.#removeElements(skeletonList);
    this.videoList.append(...resultElementArray);
    this.requestMoreResult.observe(this.videoList.lastChild);
  };

  #handleSearch = async (event) => {
    event.preventDefault();
    const { value: keyword } = this.searchInputKeyword;
    if (this.#isBlankInput(keyword)) {
      return;
    }
    this.videoList.innerHTML = '';
    this.#loadSkeleton();
    const searchResultArray = await this.sendSearchRequest(keyword);
    this.#renderSearchResult(searchResultArray);
  };

  #isBlankInput = (input) => input.trim() === '';

  #skeletonTemplate = () =>
    `<div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>`.repeat(10);

  #loadSkeleton = () => {
    this.videoList.insertAdjacentHTML('beforeend', this.#skeletonTemplate());
  };
}

export default View;
