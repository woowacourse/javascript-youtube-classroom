import { MESSAGE } from '../constants';
import { $ } from '../utils/dom';
import { video } from '../domain/video';
import { classRoomVideo } from './classRoomVideo';
import { showSnackBar } from '../utils/dom';

export default class ClassRoom {
  constructor() {
    $('#will-watch-video-button').classList.add('highlight');
    classRoomVideo.resetVideoList();
    classRoomVideo.renderVideoList(false);
    this.addNavTabButtonEvent();
    this.addVideoCheckButtonEvent();
    this.addVideoRemoveButtonEvent();
  }

  addNavTabButtonEvent() {
    $('.nav__tab').addEventListener('click', e => {
      classRoomVideo.resetVideoList();
      e.target.classList.add('highlight');
      if (e.target === $('#will-watch-video-button')) {
        $('#watched-video-button').classList.remove('highlight');
        classRoomVideo.resetVideoList();
        classRoomVideo.renderVideoList(false);
        return;
      }
      $('#will-watch-video-button').classList.remove('highlight');
      classRoomVideo.resetVideoList();
      classRoomVideo.renderVideoList(true);
    });
  }

  addVideoCheckButtonEvent() {
    $('.classroom-video__list').addEventListener('click', e => {
      if (e.target.classList.contains('video-item__check-button')) {
        try {
          const videoId = e.target.dataset.videoId;
          video.check(videoId);
          classRoomVideo.resetVideoList();
          classRoomVideo.renderVideoList(false);
          showSnackBar(MESSAGE.CHECK_SUCCESS);
        } catch {
          showSnackBar(MESSAGE.CHECK_FAILURE);
        }
      }
    });
  }

  addVideoRemoveButtonEvent() {
    $('.classroom-video__list').addEventListener('click', e => {
      if (e.target.classList.contains('video-item__remove-button') && confirm(MESSAGE.REMOVE_CONFIRM)) {
        try {
          const videoId = e.target.dataset.videoId;
          video.remove(videoId);
          classRoomVideo.resetVideoList();
          $('#watched-video-button').classList.contains('highlight')
            ? classRoomVideo.renderVideoList(true)
            : classRoomVideo.renderVideoList(false);
          showSnackBar(MESSAGE.REMOVE_SUCCESS);
        } catch {
          showSnackBar(MESSAGE.REMOVE_FAILURE);
        }
      }
    });
  }
}
