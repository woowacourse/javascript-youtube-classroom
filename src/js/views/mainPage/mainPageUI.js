import template from './template.js';
import { $ } from '../../utils/querySelector.js';

const mainPageUI = {
  renderSavedVideoItems: savedVideos => {
    if (!savedVideos) {
      mainPageUI.renderNothingSavedImage();
      return;
    }

    $('.nothing-saved-image-container').replaceChildren();

    $('.saved-video').hidden = false;
    const hasWatchedVideoList = $('.saved-video-list').classList.contains('watched-list');
    if (hasWatchedVideoList) {
      mainPageUI.renderWatchedVideos(savedVideos);
      return;
    }
    mainPageUI.renderSavedVideos(savedVideos);
  },

  renderWatchedVideos: savedVideos => {
    savedVideos.forEach(savedVideo => {
      if (savedVideo.watched) {
        $('.saved-video-list').insertAdjacentHTML(
          'beforeEnd',
          template.watchedVideoItem(savedVideo),
        );
      }
    });
  },

  renderSavedVideos: savedVideos => {
    savedVideos.forEach(savedVideo => {
      if (!savedVideo.watched) {
        $('.saved-video-list').insertAdjacentHTML('beforeEnd', template.savedVideoItem(savedVideo));
      }
    });
  },

  renderNothingSavedImage: () => {
    $('.saved-video').hidden = true;

    if ($('.nothing-saved-image-container').childElementCount === 0) {
      $('.nothing-saved-image-container').insertAdjacentHTML(
        'beforeEnd',
        template.notingSavedImage,
      );
    }
  },
};

export default mainPageUI;
