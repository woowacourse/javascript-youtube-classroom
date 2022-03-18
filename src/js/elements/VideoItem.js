import SearchedVideo from '../stores/SearchedVideo';
import CustomElement from '../abstract/CustomElement';
import { addEvent, emit } from '../utils';
import TEMPLATE from '../templates';
import SavedVideo from '../stores/SavedVideo';
import Save from '../domains/Save';

class VideoItem extends CustomElement {
  render() {
    this.innerHTML = this.template(SearchedVideo.instance.findVideo(this.dataset.id));
    Save.instance.subscribe(this);
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

  hideSaveButton(e) {
    if (!SavedVideo.instance.isStorable()) return;

    e.target.hidden = true;
  }
}

customElements.define('video-item', VideoItem);

export default VideoItem;
