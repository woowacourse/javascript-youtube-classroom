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
export default class SearchVideoModal {
  #searchEngine = new SearchEngine();
  #storageEngine = new StorageEngine();
  #searchButton = $('#search-button');
  #searchInputKeyword = $('#search-input-keyword');
  #searchResult = $('.search-result');
  #noResult = $('.no-result');
  #modalVideoList = $('.modal-video-list');

  constructor() {
    this.#searchButton.addEventListener('click', this.#handleSearchVideos);
    this.#searchInputKeyword.addEventListener('keypress', this.#handleSearchVideos);
    this.#searchResult.addEventListener('click', this.#handleSaveVideo);

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
      this.#modalVideoList.addEventListener('scroll', this.#handleInfiniteScroll);
    }
  };

  #initSearchEnvironment() {
    this.#hideNoResultView();
    this.#modalVideoList.replaceChildren('');
    this.#searchEngine.resetPageToken();
  }

  #renderSkeleton() {
    this.#modalVideoList.insertAdjacentHTML('beforeend', SKELETON_TEMPLATE);
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
      const parentNode = skeletonList[i];
      const { videoId, channelTitle, thumbnails, title, publishTime } = preprocessedData[i];

      parentNode.dataset.videoId = videoId;
      $('.video-item__thumbnail', parentNode).src = thumbnails;
      $('.video-item__title', parentNode).textContent = title;
      $('.video-item__channel-name', parentNode).textContent = channelTitle;
      $('.video-item__published-date', parentNode).textContent = publishTime;

      if (this.#storageEngine.isSavedVideo(videoId)) {
        $('.video-item__save-button', parentNode).classList.add('saved');
      }

      parentNode.classList.remove('skeleton');
    }
  }

  #removeRemainedSkeleton(preprocessedData) {
    const remainedSkeletonCount = VIDEO_COUNT - preprocessedData.length;

    for (let i = 0; i < remainedSkeletonCount; i++) {
      this.#modalVideoList.removeChild(this.#modalVideoList.lastElementChild);
    }

    if (this.#searchEngine.pageToken === null) {
      this.#modalVideoList.removeEventListener('scroll', this.#handleInfiniteScroll);
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
      this.#modalVideoList.replaceChildren('');
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
    this.#modalVideoList.replaceChildren('');
    this.#noResult.replaceChildren('');
    this.#noResult.insertAdjacentHTML('beforeend', SERVER_ERROR_TEMPLATE);
  }

  #handleSaveVideo = (e) => {
    if (e.target.classList.contains('video-item__save-button')) {
      const parentNode = e.target.closest('.video-item');

      const { videoId } = parentNode.dataset;
      const thumbnails = $('.video-item__thumbnail', parentNode).src;
      const title = $('.video-item__title', parentNode).textContent;
      const channelTitle = $('.video-item__channel-name', parentNode).textContent;
      const publishTime = $('.video-item__published-date', parentNode).textContent;

      const data = {
        videoId,
        thumbnails,
        title,
        channelTitle,
        publishTime,
        isWatched: false,
      };

      this.#storageEngine.saveVideo(data);
      e.target.classList.add('saved');
    }
  };
}
