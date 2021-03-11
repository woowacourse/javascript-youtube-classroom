import ClassroomModel from '../models/ClassroomModel.js';
import { isWatchingMenu } from './elementValidator.js';

export default class ClassroomController {
  constructor({ classroomView }) {
    this.view = classroomView;
    this.model = new ClassroomModel();
  }

  init() {
    this.onShowClassroom();
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
    if (this.model.hasNoWatchingVideoSaved()) {
      this.view.renderImageNoWatchingVideo();
      return;
    }
    this.view.renderOnlyWatchingVideos(this.model.watchingVideos);
  }

  showWatchedVideos() {
    if (this.model.isOnlyWatchingVideoSaved()) {
      this.view.renderImageNoWatchedVideo();
      return;
    }
    this.view.renderOnlyWatchedVideos(this.model.watchedVideos);
  }
}
