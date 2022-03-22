import { $ } from '../util';
import SavedVideoListView from './SavedVideoListView';

export default class HomeView {
  constructor({ saveVideoManager }) {
    this.savedVideoListView = new SavedVideoListView({ saveVideoManager });

    this.initDOMs();
    this.bindEvents();
  }

  initDOMs() {
    this.$app = $('#app');
    this.$modalContainer = $('#modal-container');
    this.$searchModalButton = $('#search-modal-button', this.$app);
    this.$unwatchedVideoListButton = $('#unwatched-video-list-button', this.$app);
    this.$watchedVideoListButton = $('#watched-video-list-button', this.$app);
    this.$unwatchedVideoList = $('#unwatched-video-list', this.$app);
    this.$watchedVideoList = $('#watched-video-list', this.$app);
  }

  bindEvents() {
    this.$unwatchedVideoListButton.addEventListener('click', this.onClickUnwatchedVideoListButton);
    this.$watchedVideoListButton.addEventListener('click', this.onClickWatchedVideoListButton);
    this.$searchModalButton.addEventListener('click', this.openModal);
  }

  onClickUnwatchedVideoListButton = () => {
    if (this.$unwatchedVideoList.classList.contains('hide')) {
      this.toggleVideoList();
    }
  }

  onClickWatchedVideoListButton = () => {
    if (this.$watchedVideoList.classList.contains('hide')) {
      this.toggleVideoList();
    }
  }
    
  toggleVideoList = () => {
    this.$unwatchedVideoList.classList.toggle('hide');
    this.$watchedVideoList.classList.toggle('hide');
    this.$unwatchedVideoListButton.classList.toggle('selected');
    this.$watchedVideoListButton.classList.toggle('selected');
  }

  openModal = () => {
    this.$modalContainer.classList.remove('hide');
  }
}
