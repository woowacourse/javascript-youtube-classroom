import VideoStore from '../VideoStore';
import CustomElement from '../abstract/CustomElement';
import { subscribeEvents, loadVideos } from '../domains/Save';
import { addEvent, emit } from '../utils';
import TEMPLATE from '../templates';
import { VIDEO } from '../constants';

class VideoItem extends CustomElement {
  render() {
    const video = VideoStore.instance.findVideo(this.dataset.id);

    this.innerHTML = this.template(video);
    subscribeEvents(this);
    this.hideSaveButtonAll();
  }

  template(video) {
    return TEMPLATE.generateVideoItem(video);
  }

  setEvent() {
    addEvent(this, 'click', '.video-item__save-button', (e) => this.emitEvent(e));
  }

  emitEvent(e) {
    e.preventDefault();
    this.hideSaveButton(e);

    const videoId = this.dataset.id;

    emit('.video-item__save-button', '@save', { videoId }, this);
  }

  hideSaveButton(e) {
    const videos = loadVideos();

    if (videos.length >= VIDEO.MAX_SAVABLE_COUNT) return;

    e.target.hidden = true;
  }

  hideSaveButtonAll() {
    const videos = loadVideos();

    if (videos.some((video) => video.videoId === this.dataset.id)) {
      this.querySelector('.video-item__save-button').hidden = true;
    }
  }
}

customElements.define('video-item', VideoItem);

export default VideoItem;
