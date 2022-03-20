import { MESSAGE } from '../constants';
import { $ } from '../utils/dom';
import { video } from '../domain/video';
import { youtubeClassRoomVideo } from './youtubeClassRoomVideo';
import { showSnackBar } from '../utils/dom';

export default class YoutubeClassRoom {
  constructor() {
    $('#will-watch-video-button').classList.add('highlight');
    youtubeClassRoomVideo.renderVideoList(false);
    this.addNavTabButtonEvent();
    this.addVideoCheckButtonEvent();
    this.addVideoRemoveButtonEvent();
  }

  addNavTabButtonEvent() {
    $('.nav__tab').addEventListener('click', e => {
      youtubeClassRoomVideo.reset();
      e.target.classList.add('highlight');
      if (e.target === $('#will-watch-video-button')) {
        $('#watched-video-button').classList.remove('highlight');
        youtubeClassRoomVideo.renderVideoList(false);
        return;
      }
      $('#will-watch-video-button').classList.remove('highlight');
      youtubeClassRoomVideo.renderVideoList(true);
    });
  }

  addVideoCheckButtonEvent() {
    $('.classroom-video__list').addEventListener('click', e => {
      if (e.target.classList.contains('video-item__check-button')) {
        try {
          const videoId = e.target.dataset.videoId;
          video.check(videoId);
          youtubeClassRoomVideo.renderVideoList(false);
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
          $('#watched-video-button').classList.contains('highlight')
            ? youtubeClassRoomVideo.renderVideoList(true)
            : youtubeClassRoomVideo.renderVideoList(false);
          showSnackBar(MESSAGE.REMOVE_SUCCESS);
        } catch {
          showSnackBar(MESSAGE.REMOVE_FAILURE);
        }
      }
    });
  }
}
