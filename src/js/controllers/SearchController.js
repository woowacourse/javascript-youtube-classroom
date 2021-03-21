import VideoSaveManager from '../manager/VideoSaveManager.js';
import {
  isModalOpen,
  isModalCloseButton,
  isModalDimmedArea,
  isRecentKeywordLink,
  isRecentKeywordRemoveButton,
} from './elementValidator.js';
import { isEndOfScroll } from '../utils/DOM.js';
import { doThrottling } from '../utils/throttle.js';
import { MESSAGE, SCROLL_DELAY_TIME, MAX_VIDEO_STORAGE_CAPACITY } from '../constants.js';

export default class SearchController {
  constructor({ searchModel, searchView, searchService }) {
    this.model = searchModel;
    this.view = searchView;
    this.service = searchService;
    this.videoSaveManager = new VideoSaveManager();
  }

  init() {
    this.attachEvents();
  }

  attachEvents() {
    this.view.$searchMenuButton.addEventListener('click', this.onShowModal.bind(this));
    this.view.$searchSection.addEventListener('click', this.onCloseModal.bind(this));
    document.body.addEventListener('keyup', this.onCloseModal.bind(this));
    this.view.$recentKeywords.addEventListener('click', this.onClickRecentKeyword.bind(this));
    this.view.$searchKeywordForm.addEventListener('submit', this.onRequestSearchKeyword.bind(this));
    this.view.$searchResultWrapper.addEventListener('click', this.onRequestSaveVideo.bind(this));
    this.view.$searchResultWrapper.addEventListener(
      'scroll',
      doThrottling(this.onRequestNextResult.bind(this), SCROLL_DELAY_TIME),
      { passive: true },
    );
  }

  onShowModal() {
    const recentKeywords = this.model.getRecentKeywords();
    const mostRecentKeyword = recentKeywords[0] ?? '';

    this.view.renderVisibleModal(this.model.videoCount, recentKeywords);
    if (mostRecentKeyword === '') {
      return;
    }
    this.model.init(mostRecentKeyword);
    this.showSearchGroup();
  }

  onCloseModal({ key, target, currentTarget }) {
    if ((key === 'Escape' && isModalOpen(currentTarget)) || isModalDimmedArea(target) || isModalCloseButton(target)) {
      this.view.renderInvisibleModal();
    }
    this.view.$watchingMenuButton.click();
  }

  onClickRecentKeyword({ target }) {
    if (isRecentKeywordLink(target)) {
      const keyword = target.innerText;

      this.model.init(keyword);
      this.view.init();
      this.showSearchGroup();
      return;
    }

    if (isRecentKeywordRemoveButton(target)) {
      const $keyword = target.closest('.recent-keyword');
      const keyword = $keyword.querySelector('.keyword-link').innerText;

      this.model.removeRecentKeyword(keyword);
      this.view.removeRecentKeyword(this.model.recentKeywords);
    }
  }

  onRequestSearchKeyword(e) {
    e.preventDefault();

    const keyword = e.target.elements['search-keyword-input'].value;

    if (keyword === '') {
      this.view.renderNotification(MESSAGE.NO_KEYWORD_IS_SUBMITTED);
      return;
    }
    this.model.init(keyword);
    this.view.init();
    this.view.renderRecentKeywords(this.model.getRecentKeywords());
    this.showSearchGroup();
  }

  onRequestNextResult() {
    if (!isEndOfScroll(this.view.$searchResultWrapper)) {
      return;
    }
    this.showSearchGroup();
  }

  onRequestSaveVideo({ target }) {
    if (!target.classList.contains('save-button')) {
      return;
    }
    if (target.classList.contains('saved')) {
      this.view.renderNotification(MESSAGE.VIDEO_IS_ALREADY_SAVED);
      return;
    }

    const savedCount = this.model.videoCount;

    if (savedCount >= MAX_VIDEO_STORAGE_CAPACITY) {
      this.view.renderNotification(MESSAGE.STORAGE_CAPACITY_IS_FULL);
      return;
    }

    const targetVideoData = this.model.getTargetVideoData(target.id);

    this.model.saveVideo(targetVideoData);
    this.view.renderInvisibleSaveButton(target);
    this.view.renderSaveVideoCount(savedCount + 1);
    this.view.renderNotification(MESSAGE.VIDEO_IS_SAVED_SUCCESSFULLY);

    this.videoSaveManager.notify(targetVideoData);
  }

  showSearchGroup() {
    this.view.renderSkeleton();
    this.service
      .getSearchResultAsync()
      .then((result) => this.view.renderSearchResult(result))
      .catch(() => {
        this.view.init();
        this.view.renderNotification(MESSAGE.SEARCH_REQUEST_HAS_FAILED);
      });
  }
}
