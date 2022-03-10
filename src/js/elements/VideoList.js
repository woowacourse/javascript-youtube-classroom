import VideoStore from '../VideoStore';
import { addEvent, emit, $, $$ } from '../utils';
import TEMPLATE from '../templates';

class VideoList extends HTMLUListElement {
  constructor() {
    super();
    this.setEvent();
    this.subscribe();
  }

  setEvent() {
    addEvent(this, 'scroll', 'ul', (e) => this.emitEvent(e));
  }

  emitEvent(e) {
    const { clientHeight } = this;
    const { scrollTop, scrollHeight } = e.target;

    if (clientHeight + scrollTop >= scrollHeight && scrollTop !== 0) {
      emit('ul', '@scroll', {}, $('search-result'));
    }
  }

  subscribe() {
    VideoStore.instance.subscribe(this);
  }

  notify(type, data) {
    if (type === 'search') {
      this.resetResult();
      this.scrollTop = 0;
    }

    this.removeSkeleton();
    this.insertVideoItems(data);
  }

  resetResult() {
    this.textContent = '';
  }

  insertSkeleton() {
    this.insertAdjacentHTML('beforeend', TEMPLATE.SKELETON.repeat(10));
  }

  removeSkeleton() {
    $$('.skeleton').forEach((e) => e.remove());
  }

  insertVideoItems(videos) {
    videos.forEach((video) => {
      this.insertAdjacentHTML('beforeend', `<video-item data-id=${video.id}></video-item>`);
    });
  }
}

customElements.define('video-list', VideoList, { extends: 'ul' });

export default VideoList;
