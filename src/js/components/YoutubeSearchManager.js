import { searchYoutube } from '../api.js';
import { $, $all, showSnackbar, renderSkeletonUI, closeModal } from '../utils.js';
import { ALERT_MESSAGE, SELECTORS, LOCAL_STORAGE_KEYS, SERACH_RESULT, SETTINGS } from '../constants.js';
import {
  getVideoTemplate,
  getFormTemplate,
  getNoResultTemplate,
  getEmptySearchResultTemplate,
  getRecentKeywordTemplate,
} from '../templates.js';
import Observer from '../lib/Observer.js';

export default class YoutubeSearchManager extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.pageToken = '';
    this.keyword = '';
    this.selector = SELECTORS.CLASS.YOUTUBE_SEARCH_FORM_CONTAINER;

    this.setScrollObserver();
  }

  setScrollObserver() {
    const options = {
      root: $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER),
      threshold: 1,
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          this.handleAdditionalSearch();
        }
      });
    }, options);
  }

  async handleAdditionalSearch() {
    try {
      const response = await searchYoutube(this.keyword, this.pageToken);
      this.pageToken = response.nextPageToken;

      const template = this.getResultTemplate(response.items);
      this.renderResults(template);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  getResultTemplate(result) {
    return result
      .map((item) => {
        const { channelId, title, channelTitle, publishedAt } = item.snippet;
        const id = item.id.videoId;

        const { watchList } = this.store.get();
        const watchListIds = watchList.map((item) => item.videoId);
        const isSaved = watchListIds.includes(id);
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
    $(SELECTORS.CLASS.SENTINEL).insertAdjacentHTML('beforebegin', template);
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
    this.store.update(LOCAL_STORAGE_KEYS.RECENT_KEYWORD_LIST, newKeywordList);
  }

  async handleSearch(event) {
    event.preventDefault();

    this.keyword = event.target.elements.keyword.value;

    this.renderEmptySearchResult();
    renderSkeletonUI(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT, SERACH_RESULT.SKELETON_UI_COUNT);

    try {
      const response = await searchYoutube(this.keyword);
      this.pageToken = response.nextPageToken;
      this.updateRecentKeywordList(this.keyword);

      if (response.pageInfo.totalResults === 0) {
        this.renderNoResult();
        return;
      }

      this.renderEmptySearchResult();
      $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).scrollTo(0, 0);

      const template = this.getResultTemplate(response.items);
      this.renderResults(template);

      this.scrollObserver.observe($(SELECTORS.CLASS.SENTINEL));
    } catch (error) {
      console.error(error);
      this.renderEmptySearchResult();

      showSnackbar(error.message);
    }
  }

  async handleSaveVideo(event) {
    if (!event.target.classList.contains('btn-save')) return;

    const watchList = this.store.get()[LOCAL_STORAGE_KEYS.WATCH_LIST];
    if (watchList.length >= SETTINGS.MAX_VIDEO_COUNT) {
      showSnackbar(ALERT_MESSAGE.MAX_VIDEO_COUNT_EXCEEDED);
      return;
    }

    const $selectedButton = event.target;
    const selectedVideoId = $selectedButton.dataset.videoId;

    const newVideo = {
      videoId: selectedVideoId,
      watched: false,
    };

    this.store.update(LOCAL_STORAGE_KEYS.WATCH_LIST, [...watchList, newVideo]);

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
    $(SELECTORS.CLASS.YOUTUBE_SEARCH_RESULT_CONTAINER).addEventListener('click', this.handleSaveVideo.bind(this));
    $(SELECTORS.CLASS.RECENT_KEYWORD_LIST).addEventListener('click', this.handleClickRecentKeyword.bind(this));
    $(SELECTORS.CLASS.MODAL).addEventListener('click', this.handleClickDimmer.bind(this));
  }

  update() {
    this.renderRecentKeywordList();
    this.renderSavedVideoCount();
  }
}
