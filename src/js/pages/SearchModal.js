import { OPTIONS, fetchData, makeURLQuery, YOUTUBE_URL, fetchVideoList } from '../api';
import { RULES, THROTTLE_PENDING_MILLISECOND } from '../constants';
import VideoCardContainer from '../common/VideosCardContainer';
import throttle from '../utils/throttle';
import ErrorContainer from '../common/ErrorContainer';

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

export default class SearchModal {
  constructor(element) {
    this.element = element;

    //initDOM
    this.searchInputKeyword = this.element.querySelector('#search-input-keyword');
    this.searchErrorMessage = this.element.querySelector('#search-error-message');
    this.videoList = this.element.querySelector('.video-list');
    this.dimmer = this.element.querySelector('.dimmer');
    this.searchForm = this.element.querySelector('#search-form');
    this.noResultDescription = this.element.querySelector('.no-result__description');
    [this.searchResultContainer, this.noSearchResultContainer] =
      this.element.querySelectorAll('.search-result');

    //bindEvent
    this.dimmer.addEventListener('click', this.closeModalHandler.bind(this));
    this.searchForm.addEventListener('submit', this.searchHandler.bind(this));
    this.videoList.addEventListener(
      'scroll',
      throttle(this.scrollHandler.bind(this), THROTTLE_PENDING_MILLISECOND),
    );

    this.VideoCardContainer = new VideoCardContainer(this.videoList, {
      items: [],
    });
    this.ErrorContainer = new ErrorContainer(this.noResultDescription);

    this.pageToken = '';
    this.keyword = '';
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
        keyword: this.keyword,
        options: OPTIONS,
        pageToken: this.pageToken,
      });
    }
  }

  async searchHandler(e) {
    e.preventDefault();

    try {
      validateKeyword(this.searchInputKeyword.value);

      this.keyword = this.searchInputKeyword.value;
      this.videoList.scrollTo({ top: 0 });
      this.videoList.replaceChildren();
      this.pageToken = '';

      this.renderVideoList({
        url: YOUTUBE_URL,
        keyword: this.keyword,
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
      const videos = await fetchVideoList(URLquery);

      this.VideoCardContainer.setState({ items: videos.items });

      this.showSearchResult(videos.items);

      this.pageToken = videos.nextPageToken || '';
    } catch ({ message }) {
      console.log(message);
      this.ErrorContainer.setState({ status: message });
      this.showNoResultContainer();
    }

    this.removeSkeletonUI(this.videoList);
  }
}
