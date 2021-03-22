import { $ } from '../utils/DOM.js';
import { showSnackbar } from '../utils/snackbar.js';
import { getSavedVideoTemplate } from './layout/storedVideo.js';
import { CLASS_NAME, NOTIFICATION_SHOW_TIME } from '../constants.js';

const buttonSelectedStyle = 'bg-cyan-100';
const {
  WATCHING_SECTION,
  WATCHED_SECTION,
  LIKED_SECTION,
  WATCHING,
  WATCHED,
  LIKED,
  NOT_LIKED,
  NO_WATCHING,
  NO_WATCHED,
  NO_LIKED,
} = CLASS_NAME;

export default class StorageView {
  constructor() {
    this.selectDOMs();
  }

  selectDOMs() {
    this.$watchingMenuButton = $('.js-watching-menu-button');
    this.$watchedMenuButton = $('.js-watched-menu-button');
    this.$likedMenuButton = $('.js-liked-menu-button');
    this.$storageSection = $('.js-storage-section');
    this.$noVideoFound = $('.js-no-video-found');
    this.$snackbar = $('.js-snackbar');
    this.$removalConfirm = $('.js-confirm');
  }

  renderVideosToPrepare(videos) {
    const videosHTML = videos.map((video) => getSavedVideoTemplate(video)).join('');

    this.$storageSection.innerHTML = videosHTML;
  }

  renderSavedVideo(video) {
    this.$storageSection.insertAdjacentHTML('beforeEnd', getSavedVideoTemplate(video, WATCHING));
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
    this.$watchingMenuButton.classList.add(buttonSelectedStyle);
    this.$watchedMenuButton.classList.remove(buttonSelectedStyle);
    this.$likedMenuButton.classList.remove(buttonSelectedStyle);

    this.$noVideoFound.classList.remove(NO_WATCHING, NO_WATCHED, NO_LIKED);
    this.$storageSection.classList.remove(WATCHED_SECTION, LIKED_SECTION);
    this.$storageSection.classList.add(WATCHING_SECTION);
  }

  renderOnlyWatchedVideos() {
    this.$watchedMenuButton.classList.add(buttonSelectedStyle);
    this.$watchingMenuButton.classList.remove(buttonSelectedStyle);
    this.$likedMenuButton.classList.remove(buttonSelectedStyle);

    this.$noVideoFound.classList.remove(NO_WATCHING, NO_WATCHED, NO_LIKED);
    this.$storageSection.classList.remove(WATCHING_SECTION, LIKED_SECTION);
    this.$storageSection.classList.add(WATCHED_SECTION);
  }

  renderOnlyLikedVideos() {
    this.$likedMenuButton.classList.add(buttonSelectedStyle);
    this.$watchingMenuButton.classList.remove(buttonSelectedStyle);
    this.$watchedMenuButton.classList.remove(buttonSelectedStyle);

    this.$noVideoFound.classList.remove(NO_WATCHING, NO_WATCHED, NO_LIKED);
    this.$storageSection.classList.remove(WATCHING_SECTION, WATCHED_SECTION);
    this.$storageSection.classList.add(LIKED_SECTION);
  }

  renderWatchFlagSwitchedVideo($video, wasWatching) {
    $video.querySelector('.js-check-button').classList.toggle('checked');
    if (wasWatching) {
      $video.classList.remove(WATCHING);
      $video.classList.add(WATCHED);
    } else {
      $video.classList.remove(WATCHED);
      $video.classList.add(WATCHING);
    }
  }

  renderLikeFlagSwitchedVideo($video, wasLiked) {
    $video.querySelector('.js-like-button').classList.toggle('checked');
    if (wasLiked) {
      $video.classList.remove(LIKED);
      $video.classList.add(NOT_LIKED);
    } else {
      $video.classList.add(LIKED);
      $video.classList.remove(NOT_LIKED);
    }
  }

  removeVideo($video) {
    $video.remove();
  }

  renderNotification(message) {
    showSnackbar({ message, showtime: NOTIFICATION_SHOW_TIME });
  }

  renderVisibleRemovalConfirm(message) {
    this.$removalConfirm.classList.add('show');
    this.$removalConfirm.querySelector('h1').innerText = message;
  }

  renderInvisibleRemovalConfirm() {
    this.$removalConfirm.classList.remove('show');
    this.$removalConfirm.querySelector('h1').innerText = '';
  }
}
