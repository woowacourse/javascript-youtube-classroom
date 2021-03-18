import { MESSAGE, MAX_VIDEO_STORAGE_CAPACITY } from '../constants.js';

export default class YoutubeManager {
  constructor({ searchModel, classroomModel, searchView, classroomView }) {
    this.searchModel = searchModel;
    this.classroomModel = classroomModel;
    this.searchView = searchView;
    this.classroomView = classroomView;
  }

  showModal(recentKeywords) {
    this.searchView.renderVisibleModal(this.classroomModel.videoCount, recentKeywords);
  }

  closeModal() {
    this.classroomView.$watchingMenuButton.click();
  }

  saveVideo($target) {
    const savedCount = this.classroomModel.videoCount;

    if (savedCount >= MAX_VIDEO_STORAGE_CAPACITY) {
      this.searchView.renderNotification(MESSAGE.STORAGE_CAPACITY_IS_FULL);
      return;
    }

    const targetVideoData = this.searchModel.getTargetVideoData($target.id);

    this.classroomModel.addVideo(targetVideoData);
    this.classroomView.renderSavedVideo(targetVideoData);

    this.searchModel.saveVideo(targetVideoData);
    this.searchView.renderInvisibleSaveButton($target);
    this.searchView.renderSaveVideoCount(savedCount + 1);
    this.searchView.renderNotification(MESSAGE.VIDEO_IS_SAVED_SUCCESSFULLY);
  }
}
