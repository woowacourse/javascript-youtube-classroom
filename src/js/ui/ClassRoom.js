import { MESSAGE } from '../constants';
import { $ } from '../utils/dom';
import { video } from '../domain/video';
import { classRoomVideo } from './classRoomVideo';
import { showSnackBar } from '../utils/dom';

export default class ClassRoom {
  constructor() {
    this.$navTab = $('.nav__tab');
    this.$willWatchVideoButton = $('#will-watch-video-button');
    this.$watchedVideoButton = $('#watched-video-button');
    this.$classroomVideoList = $('.classroom-video__list');

    this.$willWatchVideoButton.classList.add('highlight');
    classRoomVideo.renderVideoList('notWatched');

    this.$navTab.addEventListener('click', this.handleNavTabButtonClick);
    this.$classroomVideoList.addEventListener('click', this.handleVideoCheckButtonClick);
    this.$classroomVideoList.addEventListener('click', this.handleVideoRemoveButtonClick);
  }

  handleNavTabButtonClick = e => {
    classRoomVideo.resetVideoList();
    e.target.classList.add('highlight');
    if (e.target === this.$willWatchVideoButton) {
      this.$watchedVideoButton.classList.remove('highlight');
      classRoomVideo.resetVideoList();
      classRoomVideo.renderVideoList('notWatched');
      return;
    }
    this.$willWatchVideoButton.classList.remove('highlight');
    classRoomVideo.resetVideoList();
    classRoomVideo.renderVideoList('watched');
  };

  handleVideoCheckButtonClick = e => {
    if (e.target.classList.contains('video-item__check-button')) {
      try {
        const videoId = e.target.dataset.videoId;
        video.check(videoId);
        classRoomVideo.resetVideoList();
        classRoomVideo.renderVideoList('notWatched');
        showSnackBar(MESSAGE.CHECK_SUCCESS);
      } catch {
        showSnackBar(MESSAGE.CHECK_FAILURE);
      }
    }
  };

  handleVideoRemoveButtonClick = e => {
    if (e.target.classList.contains('video-item__remove-button') && confirm(MESSAGE.REMOVE_CONFIRM)) {
      try {
        const videoId = e.target.dataset.videoId;
        video.remove(videoId);
        classRoomVideo.resetVideoList();
        this.$watchedVideoButton.classList.contains('highlight')
          ? classRoomVideo.renderVideoList('watched')
          : classRoomVideo.renderVideoList('notWatched');
        showSnackBar(MESSAGE.REMOVE_SUCCESS);
      } catch {
        showSnackBar(MESSAGE.REMOVE_FAILURE);
      }
    }
  };
}
