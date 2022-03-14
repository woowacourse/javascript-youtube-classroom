import { OPTIONS, fetchData, makeURLQuery, YOUTUBE_URL } from '../api';
import { RULES, THROTTLE_PENDING_MILLISECOND } from '../constants';
import VideoCardContainer from '../common/VideosCardContainer';
import throttle from '../utils/throttle';

const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

const validateKeyword = (keyword) => {
  if (isEmptyKeyword(keyword)) {
    throw new Error('검색어를 입력해 주세요.');
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

const NO_SEARCH_RESULT_TEMPLATE = `
  검색 결과가 없습니다<br />
  다른 키워드로 검색해보세요
  `;

const EXCEEDED_QUOTA_TEMPLATE = `
  오늘 검색 할당량을 모두 소진했습니다<br />
  내일 다시 찾아주세요.
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
    this.searchInputKeyword = this.element.querySelector('#search-input-keyword');
    this.searchErrorMessage = this.element.querySelector('#search-error-message');
    this.videoList = this.element.querySelector('.video-list');
    this.dimmer = this.element.querySelector('.dimmer');
    this.searchForm = this.element.querySelector('#search-form');
    this.noResultDescription = this.element.querySelector('.no-result__description');
    [this.searchResultContainer, this.noSearchResultContainer] =
      this.element.querySelectorAll('.search-result');
  }

  bindEvents() {
    this.dimmer.addEventListener('click', this.closeModalHandler.bind(this));
    this.searchForm.addEventListener('submit', this.searchHandler.bind(this));
    this.videoList.addEventListener(
      'scroll',
      throttle(this.scrollHandler.bind(this), THROTTLE_PENDING_MILLISECOND),
    );
  }

  closeModalHandler() {
    this.element.classList.add('hide');
  }

  scrollHandler(e) {
    const { scrollTop, offsetHeight, scrollHeight } = e.target;

    const isEndOfScroll = scrollTop + offsetHeight >= scrollHeight;

    if (isEndOfScroll) {
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

    try {
      validateKeyword(this.searchInputKeyword.value);

      this.videoList.scrollTo({ top: 0 });
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
      SKELETON_TEMPLATE.repeat(RULES.MAX_VIDEO_AMOUNT_PER_REQUEST),
    );
  }

  removeSkeletonUI(element) {
    element.querySelectorAll('.skeleton').forEach((skeleton) => skeleton.remove());
  }

  showNoResultContainer() {
    this.searchResultContainer.classList.add('hidden');
    this.noSearchResultContainer.classList.remove('hidden');
  }

  showResultContainer() {
    this.searchResultContainer.classList.remove('hidden');
    this.noSearchResultContainer.classList.add('hidden');
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

    const URLquery = makeURLQuery({
      ...options,
    });

    try {
      const videos = await fetchData(URLquery);

      this.VideoCardContainer.setState({ items: videos.items });

      this.showSearchResult(videos.items);

      this.pageToken = videos.nextPageToken || '';
    } catch (status) {
      this.noResultDescription.innerHTML = this.getNoResultDescription(status);
      this.showNoResultContainer();
    }

    this.removeSkeletonUI(this.videoList);
  }

  getNoResultDescription(status) {
    if (status === 403) {
      return EXCEEDED_QUOTA_TEMPLATE;
    }
    return NO_SEARCH_RESULT_TEMPLATE;
  }
}
