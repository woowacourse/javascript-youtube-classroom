import VideoStore from '../VideoStore';
import CustomElement from '../abstract/CustomElement';
import Save from '../domains/Save';
import { addEvent, emit } from '../utils';
import TEMPLATE from '../templates';
import { VIDEO } from '../constants';

class VideoItem extends CustomElement {
  render() {
    const video = VideoStore.instance.findVideo(this.dataset.id);

    this.innerHTML = this.template(video);
    Save.instance.subscribeEvents(this);
  }

  template(video) {
    return TEMPLATE.generateVideoItem(video);
  }

  setEvent() {
    addEvent({
      component: this,
      eventType: 'click',
      selector: '.video-item__save-button',
      callback: (e) => this.emitEvent(e),
    });
  }

  emitEvent(e) {
    e.preventDefault();
    this.hideSaveButton(e);

    const videoId = this.dataset.id;

    emit({
      selector: '.video-item__save-button',
      eventName: '@save',
      detail: { videoId },
      component: this,
    });
  }

  hideSaveButton(e) {
    const videos = Save.instance.getVideos();

    if (videos.length >= VIDEO.MAX_SAVABLE_COUNT) return;

    e.target.hidden = true;
  }
}

customElements.define('video-item', VideoItem);

export default VideoItem;
