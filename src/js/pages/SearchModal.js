import { URL, OPTIONS, KEY, fetchData } from '../api';
import { RELOAD_HEIGHT, RULES } from '../constants';
import { getStorageVideoIDs, setStorageVideoIDs } from '../utils/localStorage';

const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

const validateKeyword = (keyword) => {
  if (isEmptyKeyword(keyword)) {
    throw new Error('검색어를 입력해 주세요.');
  }
};

const hasVideoList = (videoList) => videoList.length !== 0;

const template = (json) => {
  const videoIds = getStorageVideoIDs(KEY);
  return json.items
    .map((item) => {
      const {
        id: { videoId },
        snippet: {
          thumbnails: {
            medium: { url },
          },
          publishTime,
          channelTitle,
          title,
        },
      } = item;

      const storeButton = videoIds.includes(videoId)
        ? ''
        : '<button class="video-item__save-button button">⬇ 저장</button>';
      const timeFormatter = publishTime.split('T')[0];
      return `
        <li class="video-item" data-video-id="${videoId}">
          <img
            src="${url}"
            alt="video-item-thumbnail" class="video-item__thumbnail">
          <h4 class="video-item__title">${title}</h4>
          <p class="video-item__channel-name">${channelTitle}</p>
          <p class="video-item__published-date">${timeFormatter}</p>
          ${storeButton}
        </li>
          `;
    })
    .join('');
};

const SKELETON_TEMPLATE = `
  <div class="skeleton">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </div>
`;

export default class SearchModal {
  constructor(element) {
    this.element = element;
    this.configureDOMs();
    this.bindEvents();
    this.pageToken = '';
  }

  configureDOMs() {
    this.searchInputKeyword = this.element.querySelector(
      '#search-input-keyword'
    );
    this.searchErrorMessage = this.element.querySelector(
      '#search-error-message'
    );
    this.videoList = this.element.querySelector('.video-list');
    this.dimmer = this.element.querySelector('.dimmer');
    this.searchForm = this.element.querySelector('#search-form');
    [this.resultContainer, this.noResultContainer] =
      this.element.querySelectorAll('.search-result');
  }

  bindEvents() {
    this.element.addEventListener('click', this.storeIDHandler.bind(this));
    this.dimmer.addEventListener('click', this.closeModalHandler.bind(this));
    this.searchForm.addEventListener('submit', this.searchHandler.bind(this));
    this.videoList.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  closeModalHandler() {
    this.element.classList.add('hide');
  }

  storeIDHandler(e) {
    if (e.target.className.includes('video-item__save-button')) {
      const videoID = e.target.closest('li').dataset.videoId;

      const videoIDs = getStorageVideoIDs(KEY);

      if (videoIDs.length >= RULES.MAX_STORED_IDS_AMOUNT) {
        return;
      }

      setStorageVideoIDs({
        key: KEY,
        value: videoIDs.concat(videoID),
      });

      e.target.remove();
    }
  }

  scrollHandler(e) {
    const { scrollTop, offsetHeight, scrollHeight } = e.target;

    const isNextScroll =
      scrollTop + offsetHeight >= scrollHeight - RELOAD_HEIGHT;

    if (isNextScroll) {
      this.renderVideoList({
        url: URL,
        keyword: this.searchInputKeyword.value,
        options: OPTIONS,
        pageToken: this.pageToken,
      });
    }
  }

  async searchHandler(e) {
    e.preventDefault();
    this.videoList.replaceChildren();
    this.pageToken = '';

    try {
      validateKeyword(this.searchInputKeyword.value);

      this.renderVideoList({
        url: URL,
        keyword: this.searchInputKeyword.value,
        options: OPTIONS,
        pageToken: this.pageToken,
      });

      this.searchErrorMessage.textContent = '';
    } catch (error) {
      this.searchErrorMessage.textContent = '검색어를 입력해 주세요.';
    }
  }

  renderSkeletonUI(element) {
    element.insertAdjacentHTML(
      'beforeend',
      SKELETON_TEMPLATE.repeat(RULES.MAX_VIDEOS)
    );
  }

  removeSkeletonUI(element) {
    element.querySelectorAll('.skeleton').forEach((ele) => ele.remove());
  }

  showNoResultContainer() {
    this.resultContainer.classList.add('hidden');
    this.noResultContainer.classList.remove('hidden');
  }

  showResultContainer() {
    this.resultContainer.classList.remove('hidden');
    this.noResultContainer.classList.add('hidden');
  }

  showSearchResult(videoList) {
    if (hasVideoList(videoList)) {
      this.showResultContainer();
      return;
    }
    this.showNoResultContainer();
  }

  async renderVideoList(props) {
    this.renderSkeletonUI(this.videoList);

    const videoList = await fetchData({
      ...props,
    });

    this.showSearchResult(videoList.items);
    this.removeSkeletonUI(this.videoList);

    this.pageToken = videoList.nextPageToken || '';
    this.videoList.insertAdjacentHTML('beforeend', template(videoList));
  }
}
