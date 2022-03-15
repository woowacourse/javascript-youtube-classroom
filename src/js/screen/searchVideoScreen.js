import SearchEngine from '../domain/searchEngine';
import StorageEngine from '../domain/storageEngine';

import notFoundImage from '../../assets/images/not_found.jpg';
import serverErrorImage from '../../assets/images/server_error.jpg';

import { isServerError, throttle } from '../util/common';
import { DELAY_MILISECOND_TIME, VIDEO_COUNT } from '../util/constants';
import { $, $$ } from '../util/domHelper';

//template
const NO_RESULT_TEMPLATE = `
  <img src=${notFoundImage} alt="no result image" class="no-result__image">
`;

const SERVER_ERROR_TEMPLATE = `
  <img src=${serverErrorImage} alt="no result image" class="no-result__error-image">
  <span>앗...현재는 서버 점검중입니다~ ∑(O_O;)</span>
`;

const PLAIN_TEXT = '---------';

const SKELETON_TEMPLATE = `
  <li class="video-item skeleton" data-video-id="">
    <div id="image-wrapper">
      <img
        src=${notFoundImage}
        alt="video-item-thumbnail" class="video-item__thumbnail">
    </div>
    <h4 class="video-item__title">${PLAIN_TEXT}</h4>
    <p class="video-item__channel-name">${PLAIN_TEXT}</p>
    <p class="video-item__published-date">${PLAIN_TEXT}</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>
`.repeat(VIDEO_COUNT);

//class
export default class SearchVideoScreen {
  #searchEngine = new SearchEngine();
  #storageEngine = new StorageEngine();
  #searchButton = $('#search-button');
  #searchInputKeyword = $('#search-input-keyword');
  #searchResult = $('.search-result');
  #noResult = $('.no-result');
  #videoList = $('.video-list');

  constructor() {
    this.#searchButton.addEventListener('click', this.#handleSearchVideos);
    this.#searchInputKeyword.addEventListener('keypress', this.#handleSearchVideos);

    //초기 화면 렌더링
    this.#noResult.insertAdjacentHTML('beforeend', NO_RESULT_TEMPLATE);
  }

  #handleSearchVideos = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.#initSearchEnvironment();
      this.#renderSkeleton();
      const keyword = this.#searchInputKeyword.value;

      try {
        const data = await this.#searchEngine.searchKeyword(keyword);
        this.#renderSearchResult(data);
      } catch ({ message: status }) {
        if (isServerError(status)) this.#renderServerErrorResult();
      }
      this.#videoList.addEventListener('scroll', this.#handleInfiniteScroll);
    }
  };

  #initSearchEnvironment() {
    this.#hideNoResultView();
    this.#videoList.replaceChildren('');
    this.#searchEngine.resetPageToken();
  }

  #renderSkeleton() {
    this.#videoList.insertAdjacentHTML('beforeend', SKELETON_TEMPLATE);
  }

  #hideNoResultView() {
    this.#searchResult.classList.remove('search-result--no-result');
    this.#noResult.classList.add('hide');
  }

  #showNoResultView() {
    this.#searchResult.classList.add('search-result--no-result');
    this.#noResult.classList.remove('hide');
  }

  #allocatePreprocessedData(preprocessedData) {
    const skeletonList = $$('.skeleton');

    for (let i = 0; i < preprocessedData.length; i += 1) {
      const element = skeletonList[i];
      const { videoId, channelTitle, thumbnails, title, publishTime } = preprocessedData[i];

      element.dataset.videoId = videoId;
      $('.video-item__thumbnail', element).src = thumbnails;
      $('.video-item__title', element).textContent = title;
      $('.video-item__channel-name', element).textContent = channelTitle;
      $('.video-item__published-date', element).textContent = publishTime;

      if (this.#storageEngine.isSavedVideo(videoId)) {
        $('.video-item__save-button', element).classList.add('saved');
      }
      element.classList.remove('skeleton');
    }
  }

  #removeRemainedSkeleton(preprocessedData) {
    const remainedSkeletonCount = VIDEO_COUNT - preprocessedData.length;

    for (let i = 0; i < remainedSkeletonCount; i++) {
      this.#videoList.removeChild(this.#videoList.lastElementChild);
    }

    if (this.#searchEngine.pageToken === null) {
      this.#videoList.removeEventListener('scroll', this.#handleInfiniteScroll);
      //TODO : 스낵바로 "더 이상의 검색결과는 존재하지 않습니다."
    }
  }

  #handleInfiniteScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    if (scrollTop + clientHeight >= scrollHeight) {
      throttle(this.#handleScrollEvent, DELAY_MILISECOND_TIME)();
    }
  };

  #handleScrollEvent = async () => {
    if (this.#searchEngine.pageToken !== null) {
      this.#renderSkeleton();
    }
    const keyword = this.#searchInputKeyword.value;

    try {
      const data = await this.#searchEngine.searchKeyword(keyword);
      this.#renderSearchResult(data, '@scroll');
    } catch ({ message: status }) {
      if (isServerError(status)) this.#renderServerErrorResult();
    }
  };

  #renderSearchResult(data, eventType) {
    if (data === null) {
      this.#videoList.replaceChildren('');
      if (eventType === '@scroll') return;

      this.#showNoResultView();
      return;
    }

    const preprocessedData = this.#searchEngine.preprocessData(data);
    this.#allocatePreprocessedData(preprocessedData);
    this.#removeRemainedSkeleton(preprocessedData);
  }

  #renderServerErrorResult() {
    this.#showNoResultView();
    this.#videoList.replaceChildren('');
    this.#noResult.replaceChildren('');
    this.#noResult.insertAdjacentHTML('beforeend', SERVER_ERROR_TEMPLATE);
  }
}
