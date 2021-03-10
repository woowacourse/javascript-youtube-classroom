import ClassroomModel from '../models/ClassroomModel.js';
import ClassroomView from '../views/ClassroomView.js';
import { isWatchedMenu, isWatchingMenu } from './elementValidator.js';

export default class ClassroomController {
  constructor() {
    this.model = new ClassroomModel();
    this.view = new ClassroomView();
  }

  init() {
    this.attachEvents();
    this.onShowClassroom();
  }

  onShowClassroom() {
    const $nav = this.view.$classroomNav;

    if (isWatchedMenu($nav) && this.model.isOnlyWatchingVideoSaved()) {
      this.view.renderNoWatchedVideo();
      return;
    }
    if (isWatchingMenu($nav) && this.model.hasNoWatchingVideoSaved()) {
      this.view.renderNoWatchingVideo();
      return;
    }
  }
}
