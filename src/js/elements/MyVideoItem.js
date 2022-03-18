import MyVideoStore from '../stores/MyVideoStore';
import CustomElement from '../abstract/CustomElement';
import Delete from '../domains/Delete';
import { addEvent, emit, formatDate } from '../utils';

class MyVideoItem extends CustomElement {
  render() {
    const { details } = MyVideoStore.instance.findVideo(this.dataset.id);

    this.innerHTML = this.template(details);
    new Delete(this);
  }

  // eslint-disable-next-line max-lines-per-function
  template(video) {
    return `
      <li class="video-item" data-video-id="${video.id}">
        <img
          src="${decodeURI(video.thumbnail)}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${decodeURI(video.title)}</h4>
        <p class="video-item__channel-name">${decodeURI(video.channelTitle)}</p>
        <p class="video-item__published-date">${formatDate(video.publishedAt)}</p>
        <button type="button" id="${
          video.id
        }-watch-button" class="video-item__watch-button button">✅</button>
        <button type="button" id="${
          video.id
        }-delete-button" class="video-item__delete-button button">🗑️</button>
      </li>
    `;
  }

  setEvent() {
    addEvent({
      component: this,
      eventType: 'click',
      selector: '.video-item__watch-button',
      callback: (e) => this.emitWatchEvent(e),
    });
    addEvent({
      component: this,
      eventType: 'click',
      selector: '.video-item__delete-button',
      callback: (e) => this.emitDeleteEvent(e),
    });
  }

  emitWatchEvent() {
    const videoId = this.dataset.id;

    emit({
      selector: '.video-item__watch-button',
      eventName: '@watch',
      detail: { videoId },
      component: this,
    });
  }

  emitDeleteEvent() {
    const videoId = this.dataset.id;

    emit({
      selector: '.video-item__delete-button',
      eventName: '@delete',
      detail: { videoId },
      component: this,
    });
  }
}

customElements.define('my-video-item', MyVideoItem);

export default MyVideoItem;
