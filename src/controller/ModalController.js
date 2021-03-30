import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
  $modal,
  $searchResultVideoWrapper,
} from '../elements.js';
import { getVideosByKeyword } from '../apis/youtube.js';
import controllerUtil from './controllerUtil.js';
import storage from '../storage.js';
import service from '../service.js';
import view from '../view.js';
import {
  BROWSER_HASH,
  SELECTOR_CLASS,
  SELECTOR_ID,
  SNACKBAR_MESSAGE,
} from '../constants.js';
import controller from '../controller.js';
import BasicController from './BasicController.js';

export default class ModalController extends BasicController {
  constructor() {
    super();
  }

  initEvent() {
    controllerUtil.setObserver(
      $searchResultIntersector,
      this.onAdditionalVideosLoad
    );
    $searchButton.addEventListener('click', this.onModalOpen);
    $searchForm.addEventListener('submit', this.onVideoSearch);
    $searchResultVideoWrapper.addEventListener(
      'click',
      this.onSelectedVideoSave
    );
    $modalCloseButton.addEventListener('click', this.onModalClose);
    $modal.addEventListener('click', event => {
      if (event.target.id === SELECTOR_ID.MODAL) {
        this.onModalClose();
      }
    });

    this.initSearchQueries();
  }

  initSearchQueries() {
    view.modal.renderSearchQueries(storage.searchQuery.getItem());
  }

  onSelectedVideoSave({ target }) {
    if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
      return;
    }

    if (!service.watchingVideo.isVideoCountUnderLimit()) {
      view.layout.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
      return;
    }

    if (service.watchingVideo.isVideosEmpty()) {
      view.watchingVideo.hideEmptyVideoImage();
      view.watchedVideo.hideEmptyVideoImage();
    }
    service.watchingVideo.pushNewVideo(target.dataset);

    if (controllerUtil.parseHash(location.hash) === BROWSER_HASH.WATCHING) {
      view.watchingVideo.renderVideos(storage.watchingVideo.getItem());
    }

    view.modal.hideVideoSaveButton(target);
    view.layout.showSnackbar(
      SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS,
      true
    );
  }

  onModalOpen() {
    const allVideoCount =
      storage.watchingVideo.getItem().length +
      storage.watchedVideo.getItem().length;
    const videos = storage.prevSearchResult.getItem().prevSearchedVideos;
    const processedVideos = service.modal.getProcessedVideos(videos);

    view.layout.highlightNavButton(BROWSER_HASH.SEARCH);
    view.modal.openModal();
    view.modal.renderSavedVideoCount(allVideoCount);
    view.modal.focusElement($searchFormInput);

    if (videos.length === 0) {
      return;
    }

    view.modal.renderSearchedVideos(processedVideos);
    view.modal.showSearchResultIntersector();
  }

  onModalClose() {
    controller.hash.routeByHash();
    view.modal.closeModal();
  }

  async onVideoSearch(event) {
    event.preventDefault();
    const input = event.target[`${SELECTOR_ID.SEARCH_FORM_INPUT}`].value.trim();

    if (input === storage.prevSearchResult.getItem().lastQuery) {
      return;
    }
    if (input === '') {
      return;
    }

    view.modal.initSearchEnv();
    const { videos, nextPageToken } = await getVideosByKeyword(input);

    if (videos.length === 0) {
      view.modal.showNotFoundImage();
      return;
    }

    service.modal.saveSearchQuery(input);
    service.modal.savePrevSearchInfo({ lastQuery: input, nextPageToken });
    service.modal.savePrevSearchedVideos(videos);
    view.modal.hideSkeletons();
    view.modal.renderSearchQueries(storage.searchQuery.getItem());
    view.modal.renderSearchedVideos(service.modal.getProcessedVideos(videos));
  }

  async onAdditionalVideosLoad() {
    const { lastQuery, pageToken } = service.modal.getPrevSearchInfo();
    const { videos, nextPageToken } = await getVideosByKeyword(
      lastQuery,
      pageToken
    );

    view.modal.insertSearchedVideos(videos);
    service.modal.savePrevSearchInfo({ nextPageToken });
  }
}
