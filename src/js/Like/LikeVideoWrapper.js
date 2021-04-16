import { LOCAL_STORAGE_KEY, CLASSNAME, MESSAGE } from "../constants/index.js";
import messenger from "../Messenger.js";
import { $ } from "../utils/DOM.js";
import { renderTheOtherTabVideo } from "../Video/render.js";
import { LIKE_VIDEO_TEMPLATE } from "../Video/template.js";

export default class LikeVideoWrapper {
  constructor() {
    this.likeVideoItemsMap = new Map(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.LIKE_VIDEO_ITEMS))
    );

    this.likeVideosMap = new Map();

    this.$noSavedVideoImage = $(
      `.${CLASSNAME.LIKE_CONTAINER} .${CLASSNAME.NO_SAVED_VIDEO_IMAGE}`
    );

    this.$likeVideoWrapper = $(`.${CLASSNAME.LIKE_VIDEO_WRAPPER}`);

    messenger.addMessageListener(
      MESSAGE.LIKE_ICON_ACTIVATED,
      this.saveVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.LIKE_ICON_DEACTIVATED,
      this.deleteVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED,
      this.deleteVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.SAVED_VIDEO_DELETED,
      this.deleteVideo.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.HIDE_IF_VIDEO_IS_SAVED,
      this.hideIfVideoIsSaved.bind(this)
    );

    this.render();
  }

  deleteVideo({ videoId }) {
    if (!this.likeVideoItemsMap.has(videoId)) {
      return;
    }

    this.likeVideoItemsMap.delete(videoId);

    this.updateLocalStorage();

    messenger.deliverMessage(MESSAGE.SAVED_VIDEOS_COUNT_CHANGED, {
      change: -1,
    });

    this.likeVideosMap.get(videoId).remove();
    this.likeVideosMap.delete(videoId);

    if (this.likeVideosMap.size === 0) {
      $.show(this.$noSavedVideoImage);
    }
  }

  saveVideo({ videoId, item }) {
    this.likeVideoItemsMap.set(videoId, item);

    this.updateLocalStorage();
    this.renderSingleVideo(item);
  }

  updateLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.LIKE_VIDEO_ITEMS,
      JSON.stringify(this.likeVideoItemsMap, (key, value) =>
        value instanceof Map ? Array.from(value) : value
      )
    );
  }

  hideIfVideoIsSaved({ videoId, callback }) {
    if (this.likeVideoItemsMap.has(videoId)) {
      callback();
    }
  }

  render() {
    if (this.likeVideoItemsMap.size === 0) {
      $.show(this.$noSavedVideoImage);
      return;
    }

    this.likeVideoItemsMap.forEach(this.renderSingleVideo.bind(this));
  }

  renderSingleVideo(item) {
    $.hide(this.$noSavedVideoImage);

    this.$likeVideoWrapper.insertAdjacentHTML(
      "afterBegin",
      LIKE_VIDEO_TEMPLATE
    );

    const $video = this.$likeVideoWrapper.children[0];
    renderTheOtherTabVideo($video, item);

    const { videoId } = item.id;
    this.likeVideosMap.set(videoId, $video);
  }
}
