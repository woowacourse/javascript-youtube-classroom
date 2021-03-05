import SearchModel from '../models/searchModel.js';
import SearchView from '../views/searchView.js';
import VideoLocalStorage from '../models/localStorage.js';
import { VIDEOS_TO_WATCH, STORAGE_CAPACITY_FULL, MAX_VIDEO_STORAGE_CAPACITY, RECENT_KEYWORDS } from '../constants.js';
import { isEndOfPage } from '../utils/DOM.js';

export default class SearchController {
  constructor() {
    this.model = new SearchModel();
    this.view = new SearchView();
    this.storage = new VideoLocalStorage();
  }

  init() {
    this.attachEvents();
  }

  attachEvents() {
    this.view.$searchButton.addEventListener('click', this.onShowModal.bind(this));
    this.view.$modalCloseButton.addEventListener('click', this.onCloseModal.bind(this));
    this.view.$searchKeywordForm.addEventListener('submit', this.onRequestSearchKeyword.bind(this));
    this.view.$recentKeywords.addEventListener('click', this.onRequestSearchRecentKeyword.bind(this));
    this.view.$searchSection.addEventListener('scroll', this.onRequestNextResult.bind(this));
    this.view.$searchResultWrapper.addEventListener('click', this.onRequestSaveVideo.bind(this));
  }

  onShowModal() {
    this.view.$searchSection.classList.add('open');
    this.view.renderStoredVideoCount(this.storage.getStoredVideoCount());
    this.showRecentKeywords();
    this.model.setKeyword(this.storage.getMostRecentKeyword());

    if (this.model.getKeyword() === '') {
      return;
    }
    this.showFirstSearchGroup();
  }

  onCloseModal() {
    this.view.renderClosedModal();
  }

  onRequestNextResult() {
    if (!isEndOfPage(this.view.$searchSection)) {
      return;
    }
    this.showSearchGroup();
  }

  onRequestSearchKeyword(e) {
    e.preventDefault();

    const keyword = e.target.elements['search-keyword-input'].value;

    if (keyword === '') {
      return;
    }
    this.model.setKeyword(keyword);
    this.showFirstSearchGroup();
    this.storage.addRecentKeyword(keyword);
    this.showRecentKeywords();
  }

  onRequestSearchRecentKeyword({ target }) {
    const keyword = target.innerText;

    this.model.setKeyword(keyword);
    this.showFirstSearchGroup();
  }

  onRequestSaveVideo({ target }) {
    if (!target.classList.contains('save-button')) {
      return;
    }

    const storedCount = this.storage.getStoredVideoCount();

    if (storedCount >= MAX_VIDEO_STORAGE_CAPACITY) {
      this.view.renderSnackbar(STORAGE_CAPACITY_FULL);
      return;
    }

    this.view.setCurrentSaveButton(target);
    this.saveVideo(target);
    this.updateViewAfterSavingVideo();
  }

  saveVideo(target) {
    const video = this.model.getVideoData(target);

    this.storage.addVideo(VIDEOS_TO_WATCH, video);
  }

  updateViewAfterSavingVideo() {
    const updatedCount = this.storage.getStoredVideoCount();

    this.view.renderInvisibleSaveButton();
    this.view.renderStoredVideoCount(updatedCount);
  }

  showSkeleton() {
    this.view.renderSkeleton();
  }

  showSearchResult() {
    const searchResult = this.model.getSearchResult();

    this.view.setCurrentGroupElements();
    this.view.renderSkeletonRemoved();

    if (searchResult.length === 0) {
      this.view.renderResultNotFound();
      return;
    }

    this.showEachVideo(searchResult);
  }

  showEachVideo(searchResult) {
    this.view.$currentGroupVideos.forEach(($video, i) => {
      const result = searchResult[i];

      this.view.setCurrentVideoElements($video);
      this.view.renderVideo(result);
      this.model.setVideoData(this.view.$saveButton, result);
      this.storage.isStoredVideo(result.videoId)
        ? this.view.renderInvisibleSaveButton()
        : this.view.renderVisibleSaveButton();
    });
  }

  showSearchGroup() {
    this.showSkeleton();
    this.model
      .requestSearchResult()
      .then(() => this.showSearchResult())
      .catch((error) => console.error(error));
  }

  showRecentKeywords() {
    const recentKeywords = this.storage.getList(RECENT_KEYWORDS);

    this.view.renderRecentKeywords(recentKeywords);
  }

  showFirstSearchGroup() {
    this.model.initSearchResult();
    this.view.initSearchResult();
    this.showSearchGroup();
  }
}
