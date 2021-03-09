import { $ } from '../utils/util.js';
import { videoNotFoundTemplate } from '../templates/video-template.js';
class SavedView {
  renderNotFoundSavedVideo() {
    const $savedVideoWrapper = $('#saved-video-wrapper');
    $savedVideoWrapper.innerHTML = videoNotFoundTemplate();
  }
}

export default SavedView;
