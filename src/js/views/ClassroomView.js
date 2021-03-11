import { $ } from '../utils/DOM.js';
import { getSavedVideoTemplate } from './layout/storedVideo.js';
import { WATCHING_SECTION, WATCHED_SECTION, WATCHING, WATCHED, NO_WATCHING, NO_WATCHED } from '../constants.js';

export default class ClassroomView {
  constructor() {
    this.selectDOMs();
  }

  selectDOMs() {
    this.$watchingMenuButton = $('.js-watching-menu-button');
    this.$watchedMenuButton = $('.js-watched-menu-button');
    this.$savedVideosWrapper = $('.js-saved-videos-wrapper');
    this.$noVideoFound = $('.js-no-video-found');
  }

  renderVideosToPrepare({ watchingVideos, watchedVideos }) {
    const watchingVideosHTML = watchingVideos.map((video) => getSavedVideoTemplate(video, WATCHING)).join('');
    const watchedVideosHTML = watchedVideos.map((video) => getSavedVideoTemplate(video, WATCHED)).join('');

    this.$savedVideosWrapper.innerHTML = watchingVideosHTML + watchedVideosHTML;
  }

  renderSavedVideo(video) {
    this.$savedVideosWrapper.insertAdjacentHTML('beforeEnd', getSavedVideoTemplate(video, WATCHING));
  }

  renderImageNoWatchingVideo() {
    this.$noVideoFound.classList.add(NO_WATCHING);
  }

  renderImageNoWatchedVideo() {
    this.$noVideoFound.classList.add(NO_WATCHED);
  }

  renderOnlyWatchingVideos() {
    this.$watchingMenuButton.classList.add('bg-cyan-100');
    this.$watchedMenuButton.classList.remove('bg-cyan-100');
    this.$noVideoFound.classList.remove(NO_WATCHED);
    this.$savedVideosWrapper.classList.replace(WATCHED_SECTION, WATCHING_SECTION);
  }

  renderOnlyWatchedVideos() {
    this.$watchedMenuButton.classList.add('bg-cyan-100');
    this.$watchingMenuButton.classList.remove('bg-cyan-100');
    this.$noVideoFound.classList.remove(NO_WATCHING);
    this.$savedVideosWrapper.classList.replace(WATCHING_SECTION, WATCHED_SECTION);
  }
}
