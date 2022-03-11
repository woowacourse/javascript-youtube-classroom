import { OPTIONS, fetchData } from '../api';
import { ERROR_MESSAGE, RULES, THROTTLE_PENDING_MILLISECOND } from '../constants';
import VideoCardContainer from '../common/VideosCardContainer';
import { throttle } from '../utils/throttle';
import toast from '../common/toast';

const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

const validateKeyword = (keyword) => {
  if (isEmptyKeyword(keyword)) {
    throw new Error(ERROR_MESSAGE.EMPTY_KEYWORD);
  }
};

const hasVideoList = (videoList) => videoList.length !== 0;

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
    this.VideoCardContainer = new VideoCardContainer(this.videoList, {
      items: [],
    });
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
    [this.resultContainer, this.noResultContainer] = this.element.querySelectorAll('.search-result');
  }

  bindEvents() {
    this.dimmer.addEventListener('click', this.closeModalHandler.bind(this));
    this.searchForm.addEventListener('submit', this.searchHandler.bind(this));
    this.videoList.addEventListener('scroll', throttle(this.scrollHandler.bind(this), THROTTLE_PENDING_MILLISECOND));
  }

  closeModalHandler() {
    this.element.classList.add('hide');
  }

  scrollHandler(e) {
    const { scrollTop, offsetHeight, scrollHeight } = e.target;
    const isNextScroll = scrollTop + offsetHeight >= scrollHeight;

    if (isNextScroll) {
      this.renderVideoList({
        url: YOUTUBE_URL,
        keyword: this.searchInputKeyword.value,
        options: OPTIONS,
        pageToken: this.pageToken,
      });
    }
  }

  async searchHandler(e) {
    e.preventDefault();

    this.videoList.scrollTo({ top: 0 });

    try {
      validateKeyword(this.searchInputKeyword.value);

      this.videoList.replaceChildren();
      this.pageToken = '';

      this.renderVideoList({
        url: YOUTUBE_URL,
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
      SKELETON_TEMPLATE.repeat(RULES.MAX_VIDEO_AMOUNT_PER_REQUEST)
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

  async renderVideoList(options) {
    this.renderSkeletonUI(this.videoList);

    let videoList = await fetchData({
      ...options,
    });

    if (videoList.error) {
      videoList = await fetchData({
        ...options, url: YOUTUBE_URL_DUMMY
      });
      toast(ERROR_MESSAGE.API_CALLS_QUOTA_EXCEEDED);
    }

    this.VideoCardContainer.setState({ items: videoList.items });

    this.showSearchResult(videoList.items);
    this.removeSkeletonUI(this.videoList);

    this.pageToken = videoList.nextPageToken || '';
  }
}
