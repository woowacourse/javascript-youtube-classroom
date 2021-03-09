import { $, $$ } from '../utils/util.js';
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

  resetSavedVideos() {
    const $savedVideoWrapper = $('#saved-video-wrapper');
    $savedVideoWrapper.innerHTML = ``;
  }
}

export default SavedView;
