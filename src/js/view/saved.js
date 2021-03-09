import { $, parseDOMFromString } from '../utils/util.js';
import {
  savedVideoTemplate,
  videoNotFoundTemplate,
} from '../templates/video-template.js';
class SavedView {
  renderNotFoundSavedVideo() {
    const $savedVideoWrapper = $('#saved-video-wrapper');
    $savedVideoWrapper.innerHTML = videoNotFoundTemplate();
  }

  // TODO : 개선해보기..
  renderSavedVideos(infos) {
    this.resetSavedVideos();
    const $savedVideoWrapper = $('#saved-video-wrapper');
    infos.forEach(info => {
      $savedVideoWrapper.innerHTML += savedVideoTemplate(info);
    });
  }

  appendSavedVideo(info) {
    const $savedVideoWrapper = $('#saved-video-wrapper');
    if ($savedVideoWrapper.firstElementChild.id === 'saved-not-found') {
      this.resetSavedVideos();
    }

    $savedVideoWrapper.appendChild(
      parseDOMFromString(savedVideoTemplate(info))
    );
  }

  resetSavedVideos() {
    const $savedVideoWrapper = $('#saved-video-wrapper');
    $savedVideoWrapper.innerHTML = ``;
  }

  hideSelectedVideo(target) {
    const $savedVideoWrapper = $('#saved-video-wrapper');
    $savedVideoWrapper.removeChild(target.closest('.clip'));

    if ($savedVideoWrapper.children.length === 0) {
      $savedVideoWrapper.innerHTML = videoNotFoundTemplate();
    }
  }
}

export default SavedView;
