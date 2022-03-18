import SearchedVideo from '../stores/SearchedVideo';
import CustomElement from '../abstract/CustomElement';
import { addEvent, emit } from '../utils';
import TEMPLATE from '../templates';
import { VIDEO } from '../constants';
import SavedVideo from '../stores/SavedVideo';

class VideoItem extends CustomElement {
  render() {
    const video = SearchedVideo.instance.findVideo(this.dataset.id);

    this.innerHTML = this.template(video);
    SavedVideo.instance.subscribeEvents(this);
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
    const videos = SavedVideo.instance.getVideos();

    if (videos.length >= VIDEO.MAX_SAVABLE_COUNT) return;

    e.target.hidden = true;
  }
}

customElements.define('video-item', VideoItem);

export default VideoItem;
