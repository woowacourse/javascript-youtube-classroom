import CustomElement from '../abstract/CustomElement';
import { addEvent, emit } from '../utils';
import { subscribeEvents, loadVideos } from '../domains/Save';
import TEMPLATE from '../templates';
import VideoStore from '../VideoStore';

class VideoItem extends CustomElement {
  render() {
    const video = VideoStore.instance.findVideo(this.dataset.id);

    this.innerHTML = this.template(video);
    subscribeEvents(this);
    this.hideSaveButton();
  }

  template(video) {
    return TEMPLATE.generateVideoItem(video);
  }

  setEvent() {
    addEvent(this, 'click', '.video-item__save-button', (e) => this.emitEvent(e));
  }

  emitEvent(e) {
    e.preventDefault();
    e.target.hidden = true;

    const videoId = this.dataset.id;

    emit('.video-item__save-button', '@save', { videoId }, this);
  }

  hideSaveButton() {
    const videos = loadVideos();

    if (videos.some((video) => video.videoId === this.dataset.id)) {
      this.querySelector('.video-item__save-button').hidden = true;
    }
  }
}

customElements.define('video-item', VideoItem);

export default VideoItem;
