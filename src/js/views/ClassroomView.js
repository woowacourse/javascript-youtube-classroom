import { $ } from '../utils/DOM.js';
import { getSavedVideoTemplate } from '../layout/storedVideo.js';

export default class ClassroomView {
  constructor() {
    this.selectDOMs();
  }

  selectDOMs() {
    this.$savedVideos = $('.js-saved-videos');
  }

  renderWatchingVideo() {
    this.$savedVideos.classList.replace('watched-section', 'watching-section');
  }

  renderWatchedVideo() {
    this.$savedVideos.classList.replace('watching-section', 'watched-section');
  }

  renderSavedVideo(video) {
    this.$savedVideos.insertAdjacentHTML('beforeEnd', getSavedVideoTemplate(video));
  }

  renderNoWatchedVideo() {}

  renderWatchedVideo() {}
}
