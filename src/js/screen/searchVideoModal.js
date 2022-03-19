import SearchEngine from '../domain/searchEngine';
import StorageEngine from '../domain/storageEngine';
import MessageBot from './messageModal';

import { NO_RESULT_TEMPLATE, SERVER_ERROR_TEMPLATE, SKELETON_TEMPLATE } from './template';

import { isNull, isServerError, throttle } from '../util/common';
import { DELAY_MILISECOND_TIME, MESSAGE, MESSAGE_TYPE, VIDEO_COUNT } from '../util/constants';
import { $, $$ } from '../util/domHelper';

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
        this.handleError(status);
        return;
      }
      this.#modalVideoList.addEventListener('scroll', this.#handleInfiniteScroll);
    }
  };

  #initSearchEnvironment() {
    this.#hideNoResultView();
    this.#modalVideoList.replaceChildren();
    this.#searchEngine.resetPageToken();
  }

  #renderSkeleton() {
    this.#modalVideoList.insertAdjacentHTML('beforeend', SKELETON_TEMPLATE);
  }

  #hideNoResultView() {
    this.#searchResult.classList.remove('search-result--no-result');
    this.#noResult.classList.add('hide');
    this.#modalVideoList.classList.remove('hide');
  }

  #showNoResultView() {
    this.#searchResult.classList.add('search-result--no-result');
    this.#noResult.classList.remove('hide');
    this.#modalVideoList.classList.add('hide');
  }

  #renderSearchResult(data, eventType) {
    if (isNull(data)) {
      this.#modalVideoList.replaceChildren();
      if (eventType === '@scroll') return;

      this.#showNoResultView();
      MessageBot.dispatchMessage(MESSAGE_TYPE.NOT_FOUND, MESSAGE.NOT_FOUND);
      return;
    }

    const preprocessedData = this.#searchEngine.preprocessData(data);
    this.#allocatePreprocessedData(preprocessedData);
    this.#removeRemainedSkeleton(preprocessedData);
  }

  #allocatePreprocessedData(preprocessedData) {
    const skeletonList = $$('.skeleton');

    for (let i = 0; i < preprocessedData.length; i++) {
      const parentNode = skeletonList[i];
      const { videoId, channelTitle, thumbnails, title, publishTime } = preprocessedData[i];

      parentNode.dataset.videoId = videoId;
      $('.video-item__thumbnail', parentNode).src = thumbnails;
      $('.video-item__title', parentNode).textContent = title;
      $('.video-item__channel-name', parentNode).textContent = channelTitle;
      $('.video-item__published-date', parentNode).textContent = publishTime;

      if (this.#storageEngine.isSavedVideo(videoId)) {
        const saveButton = $('.video-item__save-button', parentNode);
        saveButton.classList.add('saved');
        saveButton.textContent = '저장 됨';
      }
      parentNode.classList.remove('skeleton');
    }
  }

  #removeRemainedSkeleton(preprocessedData) {
    const remainedSkeletonCount = VIDEO_COUNT - preprocessedData.length;

    for (let i = 0; i < remainedSkeletonCount; i++) {
      this.#modalVideoList.removeChild(this.#modalVideoList.lastElementChild);
    }

    if (isNull(this.#searchEngine.pageToken)) {
      this.#modalVideoList.removeEventListener('scroll', this.#handleInfiniteScroll);
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
      this.handleError(status);
    }
  };

  handleError(status) {
    if (isServerError(status)) {
      this.#renderServerErrorResult();
      MessageBot.dispatchMessage(MESSAGE_TYPE.ERROR, MESSAGE.ERROR);
    }
  }

  #renderServerErrorResult() {
    this.#showNoResultView();
    this.#modalVideoList.replaceChildren();
    this.#noResult.replaceChildren();
    this.#noResult.insertAdjacentHTML('beforeend', SERVER_ERROR_TEMPLATE);
  }

  #handleSaveVideo = (e) => {
    if (e.target.classList.contains('video-item__save-button')) {
      const $saveButton = e.target;
      const parentNode = $saveButton.closest('.video-item');
      const data = this.getVideoData(parentNode);

      try {
        this.#storageEngine.saveVideo(data);
      } catch (error) {
        if (error.name === MESSAGE_TYPE.ALREADY_STORED) {
          MessageBot.dispatchMessage(MESSAGE_TYPE.ALREADY_STORED, error.message);
          return;
        }
        MessageBot.dispatchMessage(MESSAGE_TYPE.FULL_STORAGE, error.message);
        return;
      }

      $saveButton.classList.add('saved');
      $saveButton.textContent = '저장 됨';
      MessageBot.dispatchMessage(MESSAGE_TYPE.STORE, MESSAGE.STORE);
    }
  };

  getVideoData(parentNode) {
    const { videoId } = parentNode.dataset;
    const thumbnails = $('.video-item__thumbnail', parentNode).src;
    const title = $('.video-item__title', parentNode).textContent;
    const channelTitle = $('.video-item__channel-name', parentNode).textContent;
    const publishTime = $('.video-item__published-date', parentNode).textContent;

    return {
      videoId,
      thumbnails,
      title,
      channelTitle,
      publishTime,
      isWatched: false,
    };
  }
}
