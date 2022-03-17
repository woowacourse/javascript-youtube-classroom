import template from './template.js';
import { $ } from '../../util/querySelector.js';

const mainPageUI = {
  renderSavedVideos: savedVideos => {
    if (!savedVideos) {
      mainPageUI.renderNothingSavedImage();
      return;
    }

    $('.nothing-saved-image-container').replaceChildren();

    $('.saved-video').hidden = false;
    const isWatchedVideoList = $('.saved-video-list').classList.contains('watched-list');
    savedVideos.forEach(savedVideo => {
      if (savedVideo.watched === isWatchedVideoList) {
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
