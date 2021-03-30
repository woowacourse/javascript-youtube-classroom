import { SELECTOR_CLASS, SELECTOR_ID } from '../constants';
import service from '../service';
import storage from '../storage';
import { $ } from '../utils/querySelector';
import view from '../view';
import viewUtil from '../view/viewUtil';
import BasicController from './BasicController.js';
import { SNACKBAR_MESSAGE, CONFIRM_MESSAGE } from '../constants.js';

export default class VideoController extends BasicController {
  lowercaseKeyword;

  constructor(lowercaseKeyword) {
    super();

    //TODO: videoControllerKeyword 상수화, 예외처리

    this.storage = storage;
    this.lowercaseKeyword = lowercaseKeyword;
    this.uppercaseKeyword = lowercaseKeyword.toUpperCase();
    this.storage = storage[`${this.lowercaseKeyword}Video`];
    this.service = service[`${this.lowercaseKeyword}Video`];
    this.view = view[`${this.lowercaseKeyword}Video`];
  }

  initEvent() {
    $(
      '#' + SELECTOR_ID[`${this.uppercaseKeyword}_VIDEO_WRAPPER`]
    ).addEventListener('click', this.onVideoInteract);
  }

  onVideoInteract = ({ target }) => {
    if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
      this.#moveVideoBy(target);
      return;
    }

    if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
      this.#deleteVideo(target);
      return;
    }
  };

  #deleteVideo(button) {
    if (
      !view.layout.confirm(
        CONFIRM_MESSAGE[`${this.uppercaseKeyword}_VIDEO_DELETE`]
      )
    ) {
      return;
    }

    const videoId = button.dataset.videoId;

    this.storage.popVideoByVideoId(videoId);
    this.#loadVideos();
    view.layout.showSnackbar(
      SNACKBAR_MESSAGE[`${this.uppercaseKeyword}_VIDEO_DELETE_SUCCESS`],
      true
    );
  }

  #loadVideos() {
    if (this.service.isVideosEmpty()) {
      viewUtil.hideAllEmptyVideoImage();
      this.view.showEmptyVideoImage();
    }

    const videos = this.storage.getItem();
    this.view.renderVideos(videos);
  }

  #moveVideoBy(button) {
    const videoId = button.dataset.videoId;
    const storageKeywordForSending = button.dataset.storageKeywordForSending;

    this.storage.sendVideoTo(
      storage[`${storageKeywordForSending}Video`],
      videoId
    );

    this.#loadVideos();
    view.layout.showSnackbar(
      SNACKBAR_MESSAGE[`${this.uppercaseKeyword}_VIDEO_CHECK_SUCCESS`],
      true
    );
  }
}
