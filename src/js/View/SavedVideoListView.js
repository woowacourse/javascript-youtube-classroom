import { EVENT, GUIDE_MESSAGE, RESULT } from '../constants';
import { $ } from '../util';
import { template } from './template';

export default class SavedVideoListView {
  constructor({ saveVideoManager }) {
    this.saveVideoManager = saveVideoManager;

    this.initDOMs();
    this.bindEvents();
  }

  initDOMs() {
    this.$app = $('#app');
    this.$unwatchedVideoList = $('#unwatched-video-list', this.$app);
    this.$watchedVideoList = $('#watched-video-list', this.$app);
  }

  bindEvents() {
    this.$unwatchedVideoList .addEventListener('click', this.onClickIconButton);
    this.$watchedVideoList.addEventListener('click', this.onClickIconButton);
    this.$app.addEventListener(EVENT.UPDATE_SAVED_VIDEO_LIST, this.updateOnSavedVideoList);
  }

  onClickIconButton = (e) => {
    if (e.target.classList.contains('check-watched-button')) {
      this.onClickCheckWatchedButton(e);
    }
    if (e.target.classList.contains('delete-button')) {
      this.onClickDeleteButton(e);
    }
  }

  onClickCheckWatchedButton = (e) => {
    const { id } = e.target.parentNode.dataset;
    this.saveVideoManager.changeWatched(id);
  }

  onClickDeleteButton = (e) => {
    if (window.confirm(GUIDE_MESSAGE.CONFIRM_DELETE)) {
      const { id } = e.target.parentNode.dataset;
      this.saveVideoManager.deleteVideo(id);
    }
  }
  
  updateOnSavedVideoList = (e) => {
    this.updateOnUnwatchedVideoList(e);
    this.updateOnWatchedVideoList(e);
  }

  updateOnUnwatchedVideoList = (e) => {
    const { response, unwatchedVideos } = e.detail;
    if ( response !== RESULT.SUCCESS ) {
      this.$unwatchedVideoList .innerHTML = template.failToReadSavedVideo;
      return;
    }
    if (unwatchedVideos.length === 0) {
      this.$unwatchedVideoList .innerHTML = template.noUnwatchedVideo;
      return;
    }
    const unwatchedVideoListItems = unwatchedVideos.map((video) => template.savedVideoListItem(video)).join('');
    this.$unwatchedVideoList .innerHTML = unwatchedVideoListItems;
  }

  updateOnWatchedVideoList = (e) => {
    const { response, watchedVideos } = e.detail;
    if ( response !== RESULT.SUCCESS ) {
      this.$watchedVideoList.innerHTML = template.failToReadSavedVideo;
      return;
    }
    if (watchedVideos.length === 0) {
      this.$watchedVideoList.innerHTML = template.noWatchedVideo;
      return;
    }
    const watchedVideoListItems = watchedVideos.map((video) => template.savedVideoListItem(video)).join('');
    this.$watchedVideoList.innerHTML = watchedVideoListItems;
  }
}
