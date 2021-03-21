import { $, createSnackbar } from '../utils/DOM.js';
import { getSavedVideoTemplate } from './layout/storedVideo.js';
import { CLASS_NAME, SNACKBAR_SHOW_TIME } from '../constants.js';

const {
  WATCHING_SECTION,
  WATCHED_SECTION,
  LIKED_SECTION,
  WATCHING,
  WATCHED,
  LIKED,
  NO_WATCHING,
  NO_WATCHED,
  CHECKED,
  NO_LIKED,
} = CLASS_NAME;

export default class ClassroomView {
  constructor() {
    this.selectDOMs();
  }

  selectDOMs() {
    this.$watchingMenuButton = $('#watching-menu-button');
    this.$watchedMenuButton = $('#watched-menu-button');
    this.$likedMenuButton = $('#liked-menu-button');
    this.$savedVideosWrapper = $('#saved-videos-wrapper');
    this.$noVideoFound = $('#no-video-found');
    this.$snackbarWrapper = $('#snackbar-wrapper');
  }

  renderVideosToPrepare(videos) {
    const videosHTML = videos.map((video) => getSavedVideoTemplate(video)).join('');

    this.$savedVideosWrapper.innerHTML = videosHTML;
  }

  renderSavedVideo(video) {
    this.$savedVideosWrapper.insertAdjacentHTML('beforeEnd', getSavedVideoTemplate(video));
  }

  renderImageNoWatchingVideo() {
    this.$noVideoFound.classList.add(NO_WATCHING);
  }

  renderImageNoWatchedVideo() {
    this.$noVideoFound.classList.add(NO_WATCHED);
  }

  renderImageNoLikedVideo() {
    this.$noVideoFound.classList.add(NO_LIKED);
  }

  renderOnlyWatchingVideos() {
    this.setSelectedMenu(this.$watchingMenuButton);
    this.setSection(WATCHING_SECTION);
  }

  renderOnlyWatchedVideos() {
    this.setSelectedMenu(this.$watchedMenuButton);
    this.setSection(WATCHED_SECTION);
  }

  renderOnlyLikedVideos() {
    this.setSelectedMenu(this.$likedMenuButton);
    this.setSection(LIKED_SECTION);
  }

  setSelectedMenu($selectedMenu) {
    this.$watchingMenuButton.classList.remove('bg-cyan-100');
    this.$watchedMenuButton.classList.remove('bg-cyan-100');
    this.$likedMenuButton.classList.remove('bg-cyan-100');

    $selectedMenu.classList.add('bg-cyan-100');
  }

  setSection(className) {
    this.$noVideoFound.classList.remove(NO_WATCHING, NO_WATCHED, NO_LIKED);
    this.$savedVideosWrapper.classList.remove(WATCHING_SECTION, WATCHED_SECTION, LIKED_SECTION);

    this.$savedVideosWrapper.classList.add(className);
  }

  renderMovedVideo($video, wasWatching) {
    $video.querySelector('.check-button').classList.toggle(CHECKED);
    if (wasWatching) {
      $video.classList.remove(WATCHING);
      $video.classList.add(WATCHED);
    } else {
      $video.classList.remove(WATCHED);
      $video.classList.add(WATCHING);
    }
  }

  renderToggleLikedVideo($video) {
    $video.querySelector('.like-button').classList.toggle(CHECKED);
    $video.classList.toggle(LIKED);
  }

  removeVideo($video) {
    $video.remove();
  }

  renderNotification(message) {
    this.$snackbarWrapper.appendChild(createSnackbar({ message, showtime: SNACKBAR_SHOW_TIME }));
  }
}
