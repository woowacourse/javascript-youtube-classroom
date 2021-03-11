import ClassroomModel from '../models/ClassroomModel.js';
import { isWatchingMenu } from './elementValidator.js';

export default class ClassroomController {
  constructor({ classroomView }) {
    this.view = classroomView;
    this.model = new ClassroomModel();
  }

  init() {
    this.onShowClassroom();
    this.attachEvents();
  }

  attachEvents() {
    this.view.$watchingMenuButton.addEventListener('click', this.onNavigateWatchingVideos.bind(this));
    this.view.$watchedMenuButton.addEventListener('click', this.onNavigateWatchedVideos.bind(this));
  }

  onNavigateWatchingVideos() {
    this.showWatchingVideos();
  }

  onNavigateWatchedVideos() {
    this.showWatchedVideos();
  }

  onShowClassroom() {
    this.view.renderVideosToPrepare(this.model.getVideos());

    if (isWatchingMenu(this.view.$savedVideosWrapper)) {
      this.showWatchingVideos();
      return;
    }
    this.showWatchedVideos();
  }

  showWatchingVideos() {
    this.view.renderOnlyWatchingVideos();

    if (this.model.hasNoWatchingVideoSaved()) {
      this.view.renderImageNoWatchingVideo();
    }
  }

  showWatchedVideos() {
    this.view.renderOnlyWatchedVideos();

    if (this.model.isOnlyWatchingVideoSaved()) {
      this.view.renderImageNoWatchedVideo();
    }
  }
}
