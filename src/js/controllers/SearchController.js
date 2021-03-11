import { isModalOpen, isModalCloseButton, isModalDimmedArea } from './elementValidator.js';
import {
  MAX_VIDEO_STORAGE_CAPACITY,
  NO_KEYWORD_IS_SUBMITTED,
  STORAGE_CAPACITY_IS_FULL,
  VIDEO_IS_SAVED_SUCCESSFULLY,
  VIDEO_IS_ALREADY_SAVED,
  SEARCH_REQUEST_HAS_FAILED,
} from '../constants.js';
import { isEndOfScroll } from '../utils/DOM.js';

export default class SearchController {
  constructor({ searchModel, classroomModel, searchView, classroomView, searchService }) {
    this.searchModel = searchModel;
    this.classroomModel = classroomModel;
    this.searchView = searchView;
    this.classroomView = classroomView;
    this.searchService = searchService;
  }

  init() {
    this.attachEvents();
  }

  attachEvents() {
    this.searchView.$searchMenuButton.addEventListener('click', this.onShowModal.bind(this));
    this.searchView.$searchSection.addEventListener('click', this.onCloseModal.bind(this));
    document.body.addEventListener('keyup', this.onCloseModal.bind(this));
    this.searchView.$recentKeywords.addEventListener('click', this.onRequestSearchRecentKeyword.bind(this));
    this.searchView.$searchKeywordForm.addEventListener('submit', this.onRequestSearchKeyword.bind(this));
    this.searchView.$searchResultWrapper.addEventListener('scroll', this.onRequestNextResult.bind(this));
    this.searchView.$searchResultWrapper.addEventListener('click', this.onRequestSaveVideo.bind(this));
  }

  onShowModal() {
    const videoCount = this.searchModel.getSavedVideoCount();
    const recentKeywords = this.searchModel.getRecentKeywords();
    const mostRecentKeyword = recentKeywords[0] ?? '';

    this.searchView.renderVisibleModal(videoCount, recentKeywords);
    if (mostRecentKeyword === '') {
      return;
    }
    this.searchModel.init(mostRecentKeyword);
    this.showSearchGroup();
  }

  onCloseModal({ key, target, currentTarget }) {
    if ((key === 'Escape' && isModalOpen(currentTarget)) || isModalDimmedArea(target) || isModalCloseButton(target)) {
      this.searchView.renderInvisibleModal();
    }
  }

  onRequestSearchRecentKeyword({ target }) {
    const keyword = target.innerText;

    this.searchModel.init(keyword);
    this.searchView.init();
    this.showSearchGroup();
  }

  onRequestSearchKeyword(e) {
    e.preventDefault();

    const keyword = e.target.elements['search-keyword-input'].value;

    if (keyword === '') {
      this.searchView.renderNotification(NO_KEYWORD_IS_SUBMITTED);
      return;
    }
    this.searchModel.init(keyword);
    this.searchView.init();
    this.searchView.renderRecentKeywords(this.searchModel.getRecentKeywords());
    this.showSearchGroup();
  }

  onRequestNextResult() {
    if (!isEndOfScroll(this.searchView.$searchResultWrapper)) {
      return;
    }
    this.showSearchGroup();
  }

  onRequestSaveVideo({ target }) {
    if (!target.classList.contains('js-save-button')) {
      return;
    }
    if (target.classList.contains('saved')) {
      this.searchView.renderNotification(VIDEO_IS_ALREADY_SAVED);
      return;
    }

    const savedCount = this.searchModel.getSavedVideoCount();

    if (savedCount >= MAX_VIDEO_STORAGE_CAPACITY) {
      this.searchView.renderNotification(STORAGE_CAPACITY_IS_FULL);
      return;
    }

    const targetVideoData = this.searchModel.getTargetVideoData(target.id);

    this.searchModel.saveVideo(targetVideoData);
    this.classroomModel.updateWatchingVideoCount(true);
    this.searchView.renderInvisibleSaveButton(target);
    this.searchView.renderSaveVideoCount(savedCount + 1);
    this.searchView.renderNotification(VIDEO_IS_SAVED_SUCCESSFULLY);
    this.classroomView.renderSavedVideo(targetVideoData);
  }

  showSearchGroup() {
    this.searchView.renderSkeleton();
    this.searchService
      .getSearchResultAsync()
      .then((result) => this.searchView.renderSearchResult(result))
      .catch(() => {
        this.searchView.init();
        this.searchView.renderNotification(SEARCH_REQUEST_HAS_FAILED);
      });
  }
}
