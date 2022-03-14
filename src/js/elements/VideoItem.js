import VideoStore from '../VideoStore';
import CustomElement from '../abstract/CustomElement';
import Save from '../domains/Save';
import { addEvent, emit, formatDate } from '../utils';
import { VIDEO } from '../constants';

class VideoItem extends CustomElement {
  render() {
    const video = VideoStore.instance.findVideo(this.dataset.id);

    this.innerHTML = this.template(video);
    Save.instance.subscribeEvents(this);
  }

  template(video) {
    return `
      <li class="video-item" data-video-id="${video.id}">
        <img
          src="${decodeURI(video.thumbnail)}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${decodeURI(video.title)}</h4>
        <p class="video-item__channel-name">${decodeURI(video.channelTitle)}</p>
        <p class="video-item__published-date">${formatDate(video.publishedAt)}</p>
        <button id="${video.id}-save-button" class="video-item__save-button button">⬇ 저장</button>
      </li>
    `;
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
