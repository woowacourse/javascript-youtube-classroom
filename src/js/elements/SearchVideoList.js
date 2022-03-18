import SearchVideoStore from '../stores/SearchVideoStore';
import MyVideoStore from '../stores/MyVideoStore';
import { addEvent, emit, $, $$ } from '../utils';
import SKELETONS from '../templates';

import './SearchVideoItem';

class SearchVideoList extends HTMLUListElement {
  constructor() {
    super();
    addEvent({
      component: this,
      eventType: 'scroll',
      selector: 'ul',
      callback: (e) => this.emitEvent(e),
    });
    SearchVideoStore.instance.subscribe(this);
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

  insertSkeleton(type) {
    if (type === 'scroll') {
      this.insertAdjacentHTML('beforeend', SKELETONS);

      return;
    }

    this.innerHTML = SKELETONS;
    this.scrollTop = 0;
  }

  removeSkeleton() {
    $$('.skeleton').forEach((e) => e.remove());
  }

  insertVideoItems(videos) {
    videos.forEach((video) => {
      this.insertAdjacentHTML(
        'beforeend',
        `<search-video-item data-id=${video.id}></search-video-item>`
      );
    });
  }

  hideStoredVideoSaveButton(videos) {
    const storedVideoIds = MyVideoStore.instance.getVideos().map((video) => video.videoId);

    videos.forEach((video) => {
      if (storedVideoIds.includes(video.id)) {
        $(`#${video.id}-save-button`).hidden = true;
      }
    });
  }
}

customElements.define('search-video-list', SearchVideoList, { extends: 'ul' });

export default SearchVideoList;
