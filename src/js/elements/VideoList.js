import VideoStore from '../VideoStore';
import Save from '../domains/Save';
import { addEvent, emit, $, $$ } from '../utils';
import SKELETONS from '../templates';

class VideoList extends HTMLUListElement {
  constructor() {
    super();
    addEvent({
      component: this,
      eventType: 'scroll',
      selector: 'ul',
      callback: (e) => this.emitEvent(e),
    });
    VideoStore.instance.subscribe(this);
  }

  emitEvent(e) {
    const { clientHeight } = this;
    const { scrollTop, scrollHeight } = e.target;

    if (clientHeight + scrollTop >= scrollHeight && scrollTop !== 0) {
      emit({ selector: 'ul', eventName: '@scroll', detail: {}, component: $('search-result') });
    }
  }

  notify(type, data) {
    this.removeSkeleton();
    this.insertVideoItems(data);
    this.hideStoredVideoSaveButton(data);
  }

  resetResult(type) {
    if (type === 'scroll') return;

    this.textContent = '';
    this.scrollTop = 0;
  }

  insertSkeleton(type) {
    const position = type === 'search' ? 'afterbegin' : 'beforeend';

    this.insertAdjacentHTML(position, SKELETONS);
  }

  removeSkeleton() {
    $$('.skeleton').forEach((e) => e.remove());
  }

  insertVideoItems(videos) {
    videos.forEach((video) => {
      this.insertAdjacentHTML('beforeend', `<video-item data-id=${video.id}></video-item>`);
    });
  }

  hideStoredVideoSaveButton(videos) {
    const storedVideoIds = Save.instance.getVideos().map((video) => video.videoId);

    videos.forEach((video) => {
      if (storedVideoIds.includes(video.id)) {
        $(`#${video.id}-save-button`).hidden = true;
      }
    });
  }
}

customElements.define('video-list', VideoList, { extends: 'ul' });

export default VideoList;
