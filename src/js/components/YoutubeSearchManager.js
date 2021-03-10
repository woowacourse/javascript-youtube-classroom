import { searchYoutube, searchYoutubeDummyData } from '../api.js';
import { $, showSnackbar, renderSkeletonUI, formatDate, closeModal, generateCSSClass } from '../utils.js';
import { ALERT_MESSAGE, SELECTORS, LOCAL_STORAGE_KEYS, SERACH_RESULT } from '../constants.js';
import {
  getVideoTemplate,
  getFormTemplate,
  getNoResultTemplate,
  getEmptySearchResultTemplate,
  getRecentKeywordTemplate,
} from '../templates.js';
import Observer from '../lib/Observer.js';

export default class YoutubeSearchManager extends Observer {
  constructor(store, watchList) {
    super();
    this.store = store;
    this.pageToken = '';
    this.keyword = '';
    this.selector = SELECTORS.CLASS.YOUTUBE_SEARCH_FORM_CONTAINER;
    this.watchList = watchList;
  }

  getResultTemplate(result) {
    return result
      .map((item) => {
        const { channelId, title, channelTitle, publishedAt } = item.snippet;
        const id = item.id.videoId;

        const { watchList } = this.store.get();
        const isSaved = watchList.includes(id);
        const dateString = new Date(publishedAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const video = { id, title, channelId, channelTitle, dateString };
        const options = { containsSaveButton: !isSaved };

        return getVideoTemplate(video, options);
      })
      .join('');
  }

  render() {
    $(this.selector).innerHTML = getFormTemplate();

    this.renderRecentKeywordList();
    this.renderSavedVideoCount();
    this.bindEvents();
  }

  renderResults(template) {
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT).insertAdjacentHTML('beforeend', template);
  }

  renderNoResult() {
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).innerHTML = getNoResultTemplate();
  }

  renderRecentKeywordList() {
    const { recentKeywordList } = this.store.get();
    $(SELECTORS.CLASS.RECENT_KEYWORD_LIST).innerHTML = recentKeywordList
      .map((keyword) => getRecentKeywordTemplate(keyword))
      .join('');
  }

  renderSavedVideoCount() {
    $(SELECTORS.CLASS.SAVED_VIDEO_COUNT).textContent = this.store.get()[LOCAL_STORAGE_KEYS.WATCH_LIST].length;
  }

  renderEmptySearchResult() {
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).innerHTML = getEmptySearchResultTemplate();
  }

  updateRecentKeywordList(keyword) {
    const { recentKeywordList } = this.store.get();
    const newKeywordList = recentKeywordList.filter((item) => item !== keyword);

    if (newKeywordList.length >= 3) {
      newKeywordList.pop();
    }
    newKeywordList.unshift(keyword);
    this.store.update(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST, newKeywordList, this);

    // this.store.updateAll({
    //   [LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST]: newKeywordList,
    // });
  }

  async handleSearch(event) {
    event.preventDefault();

    const keyword = event.target.elements.keyword.value;

    this.renderEmptySearchResult();
    renderSkeletonUI(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT, SERACH_RESULT.SKELETON_UI_COUNT);

    try {
      const response = await searchYoutube(keyword);
      this.pageToken = response.nextPageToken;
      this.updateRecentKeywordList(keyword);

      if (response.pageInfo.totalResults === 0) {
        this.renderNoResult();
        return;
      }

      this.renderEmptySearchResult();
      $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).scrollTo(0, 0);

      const template = this.getResultTemplate(response.items);
      this.renderResults(template);
    } catch (error) {
      this.renderEmptySearchResult();

      showSnackbar(error.message);
    }
  }

  async handleScroll(event) {
    const $videoWrapper = event.target;
    const isScrollBottom =
      Math.round($videoWrapper.scrollTop) === $videoWrapper.scrollHeight - $videoWrapper.offsetHeight;

    if (isScrollBottom) {
      const keyword = $(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).value;

      try {
        const response = await searchYoutube(keyword, this.pageToken);
        this.pageToken = response.nextPageToken;

        const template = this.getResultTemplate(response.items);
        this.renderResults(template);
      } catch (error) {
        showSnackbar(error.message);
      }
    }
  }

  async handleSaveVideo(event) {
    if (!event.target.classList.contains('btn-save')) return;

    const $selectedButton = event.target;
    const selectedVideoId = $selectedButton.dataset.videoId;

    // TODO: 단일 옵저버만 업데이트할 때, this.watchList를 직접 파라미터에 넣지 않는 방법 찾아보기
    this.store.update(
      LOCAL_STORAGE_KEYS.WATCH_LIST,
      [...this.store.get()[LOCAL_STORAGE_KEYS.WATCH_LIST], selectedVideoId],
      this.watchList
    );

    $selectedButton.classList.add(SELECTORS.STATUS.HIDDEN);

    showSnackbar(ALERT_MESSAGE.VIDEO_SAVED);
  }

  handleClickRecentKeyword(event) {
    if (event.target.classList.contains('chip')) {
      const keyword = event.target.textContent;
      $(SELECTORS.ID.YOUTUBE_SEARCH_KEYWORD_INPUT).value = keyword;
      $(SELECTORS.ID.YOUTUBE_SEARCH_FORM).requestSubmit();
    }
  }

  handleClickDimmer(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  bindEvents() {
    $(SELECTORS.ID.YOUTUBE_SEARCH_FORM).addEventListener('submit', this.handleSearch.bind(this));

    // TODO: 과도한 scroll 이벤트 방지를 위해 debounce 적용 필요
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).addEventListener('scroll', this.handleScroll.bind(this));
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).addEventListener('click', this.handleSaveVideo.bind(this));
    $(SELECTORS.CLASS.RECENT_KEYWORD_LIST).addEventListener('click', this.handleClickRecentKeyword.bind(this));
    $(SELECTORS.CLASS.MODAL).addEventListener('click', this.handleClickDimmer.bind(this));
  }

  update() {
    this.renderRecentKeywordList();
    this.renderSavedVideoCount();
  }
}
