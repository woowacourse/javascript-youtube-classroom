import {
  $searchButton,
  $modalCloseButton,
  $searchForm,
  $searchFormInput,
  $searchResultIntersector,
  $modal,
  $searchResultVideoWrapper,
} from "../elements.js";
import { getVideosByKeyword } from "../apis/youtube.js";
import controllerUtil from "./controllerUtil.js";
import {
  BROWSER_HASH,
  SELECTOR_CLASS,
  SELECTOR_ID,
  SNACKBAR_MESSAGE,
} from "../constants.js";
import controller from "../controller.js";
import BasicController from "./BasicController.js";
import { layoutView, modalView } from "../view/index.js";
import {
  modalService,
  prevSearchResultService,
  searchQueryService,
  videoService,
} from "../service/index.js";

export default class ModalController extends BasicController {
  initEvent() {
    controllerUtil.setObserver(
      $searchResultIntersector,
      this.onAdditionalVideosLoad
    );
    $searchButton.addEventListener("click", this.onModalOpen);
    $searchForm.addEventListener("submit", this.onVideoSearch);
    $searchResultVideoWrapper.addEventListener(
      "click",
      this.onSelectedVideoSave
    );
    $modalCloseButton.addEventListener("click", this.onModalClose);
    $modal.addEventListener("click", event => {
      if (event.target.id === SELECTOR_ID.MODAL) {
        this.onModalClose();
      }
    });

    this.initSearchQueries();
  }

  initSearchQueries() {
    modalView.renderSearchQueries(searchQueryService.getQueries());
  }

  onSelectedVideoSave({ target }) {
    if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
      return;
    }

    if (!videoService.isVideoCountUnderLimit()) {
      layoutView.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
      return;
    }

    videoService.pushNewVideo(target.dataset);
    controller.hash.routeByHash();
    layoutView.highlightNavButton(BROWSER_HASH.SEARCH);

    modalView.hideVideoSaveButton(target);
    layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
  }

  onModalOpen() {
    const allVideoCount = videoService.getAllVideoCount();
    const videos = prevSearchResultService.getVideos();
    const processedVideos = modalService.getProcessedVideos(videos);

    layoutView.highlightNavButton(BROWSER_HASH.SEARCH);
    modalView.openModal();
    modalView.renderSavedVideoCount(allVideoCount);
    modalView.focusElement($searchFormInput);

    if (videos.length === 0) {
      return;
    }

    modalView.renderSearchedVideos(processedVideos);
    modalView.showSearchResultIntersector();
  }

  onModalClose() {
    controller.hash.routeByHash();
    modalView.closeModal();
  }

  async onVideoSearch(event) {
    event.preventDefault();
    const input = event.target[`${SELECTOR_ID.SEARCH_FORM_INPUT}`].value.trim();

    if (input === prevSearchResultService.getLastQuery()) {
      return;
    }
    if (input === "") {
      return;
    }

    modalView.initSearchEnv();
    const { videos, nextPageToken } = await getVideosByKeyword(input);

    if (videos.length === 0) {
      modalView.showNotFoundImage();
      return;
    }

    modalService.saveSearchQuery(input);
    modalService.savePrevSearchInfo({ lastQuery: input, nextPageToken });
    modalService.savePrevSearchedVideos(videos);
    modalView.hideSkeletons();
    modalView.renderSearchQueries(searchQueryService.getQueries());
    modalView.renderSearchedVideos(modalService.getProcessedVideos(videos));
  }

  async onAdditionalVideosLoad() {
    const { lastQuery, pageToken } = modalService.getPrevSearchInfo();
    const { videos, nextPageToken } = await getVideosByKeyword(
      lastQuery,
      pageToken
    );

    modalView.insertSearchedVideos(videos);
    modalService.savePrevSearchInfo({ nextPageToken });
  }
}
