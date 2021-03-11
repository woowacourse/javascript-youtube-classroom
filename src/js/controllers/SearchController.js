import SearchModel from '../models/SearchModel.js';
import SearchService from '../services/SearchService.js';
import SearchView from '../views/SearchView.js';
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
  constructor() {
    this.model = new SearchModel();
    this.service = new SearchService(this.model);
    this.view = new SearchView();
  }

  init() {
    this.attachEvents();
  }

  attachEvents() {
    this.view.$searchButton.addEventListener('click', this.onShowModal.bind(this));
    this.view.$searchSection.addEventListener('click', this.onCloseModal.bind(this));
    document.body.addEventListener('keyup', this.onCloseModal.bind(this));
    this.view.$recentKeywords.addEventListener('click', this.onRequestSearchRecentKeyword.bind(this));
    this.view.$searchKeywordForm.addEventListener('submit', this.onRequestSearchKeyword.bind(this));
    this.view.$searchResultWrapper.addEventListener('scroll', this.onRequestNextResult.bind(this));
    this.view.$searchResultWrapper.addEventListener('click', this.onRequestSaveVideo.bind(this));
  }

  onShowModal() {
    const videoCount = this.model.getSavedVideoCount();
    const recentKeywords = this.model.getRecentKeywords();
    const mostRecentKeyword = recentKeywords[0] ?? '';

    this.view.renderVisibleModal(videoCount, recentKeywords);
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
  }

  onRequestSearchRecentKeyword({ target }) {
    const keyword = target.innerText;

    this.model.init(keyword);
    this.view.init();
    this.showSearchGroup();
  }

  onRequestSearchKeyword(e) {
    e.preventDefault();

    const keyword = e.target.elements['search-keyword-input'].value;

    if (keyword === '') {
      this.view.renderNotification(NO_KEYWORD_IS_SUBMITTED);
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
    if (!target.classList.contains('js-save-button')) {
      return;
    }
    if (target.classList.contains('saved')) {
      this.view.renderNotification(VIDEO_IS_ALREADY_SAVED);
      return;
    }

    const savedCount = this.model.getSavedVideoCount();

    if (savedCount >= MAX_VIDEO_STORAGE_CAPACITY) {
      this.view.renderNotification(STORAGE_CAPACITY_IS_FULL);
      return;
    }
    this.model.saveVideo(target.id);
    this.view.renderInvisibleSaveButton(target);
    this.view.renderSaveVideoCount(savedCount + 1);
    this.view.renderNotification(VIDEO_IS_SAVED_SUCCESSFULLY);
  }

  showSearchGroup() {
    this.view.renderSkeleton();
    this.service
      .getSearchResultAsync()
      .then((result) => this.view.renderSearchResult(result))
      .catch(() => {
        this.view.init();
        this.view.renderNotification(SEARCH_REQUEST_HAS_FAILED);
      });
  }
}
