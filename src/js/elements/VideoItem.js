import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import SearchedVideo from '../stores/SearchedVideo';
import SavedVideo from '../stores/SavedVideo';
import Save from '../domains/Save';
import { $, addEvent, emit } from '../utils';

class VideoItem extends CustomElement {
  render() {
    this.innerHTML = this.template(SearchedVideo.instance.findVideo(this.dataset.id));
    Save.instance.subscribe(this);
    SavedVideo.instance.subscribe(this);
  }

  template(video) {
    return TEMPLATE.generateVideoItem(video);
  }

  setEvent() {
    addEvent(this, 'click', '.video-item__save-button', (e) => this.emitEvent(e));
  }

  emitEvent(e) {
    this.hideSaveButton(e);

    const videoId = this.dataset.id;

    emit('.video-item__save-button', '@save', { videoId }, this);
  }

  notify(action, _, target) {
    if (action !== 'remove') return;

    this.showSaveButton(target);
  }

  hideSaveButton(e) {
    if (!SavedVideo.instance.isStorable()) return;

    e.target.hidden = true;
  }

  showSaveButton(videoId) {
    if (this.dataset.id !== videoId) return;

    $('.video-item__save-button', this).hidden = false;
  }
}

customElements.define('video-item', VideoItem);

export default VideoItem;
