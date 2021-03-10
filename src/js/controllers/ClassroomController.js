import ClassroomModel from '../models/ClassroomModel.js';
import { isWatchingMenu } from './elementValidator.js';

export default class ClassroomController {
  constructor({ classroomView }) {
    this.model = new ClassroomModel();
    this.view = classroomView;
  }

  init() {
    this.onShowClassroom();
  }

  onShowClassroom() {
    if (isWatchingMenu(this.view.$savedVideos)) {
      this.showWatchingMenuContents();
      return;
    }
    this.showWatchedMenuContents();
  }

  showWatchingMenuContents() {
    if (this.model.hasNoWatchingVideoSaved()) {
      this.view.renderNoWatchingVideo();
      return;
    }
    this.view.renderWatchingVideo();
  }

  showWatchedMenuContents() {
    if (this.model.isOnlyWatchingVideoSaved()) {
      this.view.renderNoWatchedVideo();
      return;
    }
    this.view.renderWatchedVideo();
  }
}
