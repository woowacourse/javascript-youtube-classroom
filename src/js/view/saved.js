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

  renderSavedVideos(infos) {
    const $savedVideoWrapper = $('#saved-video-wrapper');
    infos.forEach(info => {
      $savedVideoWrapper.innerHTML += savedVideoTemplate(info);
    });
  }
}

export default SavedView;
