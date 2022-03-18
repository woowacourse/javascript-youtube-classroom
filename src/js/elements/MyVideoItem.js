import MyVideoStore from '../stores/MyVideoStore';
import CustomElement from '../abstract/CustomElement';
import Watch from '../domains/Watch';
import Delete from '../domains/Delete';
import { addEvent, emit, formatDate } from '../utils';

class MyVideoItem extends CustomElement {
  render() {
    const { details } = MyVideoStore.instance.findVideo(this.dataset.id);
    const targetMenu = this.dataset.menu;

    this.innerHTML = this.template(details, targetMenu);
    new Watch(this);
    new Delete(this);
  }

  // eslint-disable-next-line max-lines-per-function
  template(video, menu) {
    const watchedMenuWatchButton = menu === 'watched' ? 'watched-menu-watch-button' : '';

    return `
      <li class="video-item" data-video-id="${video.id}">
        <img
          src="${decodeURI(video.thumbnail)}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${decodeURI(video.title)}</h4>
        <p class="video-item__channel-name">${decodeURI(video.channelTitle)}</p>
        <p class="video-item__published-date">${formatDate(video.publishedAt)}</p>
        <div class="video-item__buttons">
          <button type="button" id="${
            video.id
          }-watch-button" class="video-item__watch-button button ${watchedMenuWatchButton}">✅</button>
          <button type="button" id="${
            video.id
          }-delete-button" class="video-item__delete-button button">🗑️</button>
        </div>
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
