import TEMPLATE from '../templates';
import SearchedVideo from '../stores/SearchedVideo';
import SavedVideo from '../stores/SavedVideo';
import { addEvent, emit, $, $$ } from '../utils';

import './VideoItem';

class VideoList extends HTMLUListElement {
  constructor() {
    super();
    this.setEvent();
    SearchedVideo.instance.subscribe(this);
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

  render(videos) {
    videos.forEach((video) => {
      this.insertAdjacentHTML('beforeend', `<video-item data-id=${video.id}></video-item>`);
    });
  }

  notify(_, data) {
    this.removeLoading();
    this.render(data);
    this.hideStoredVideoSaveButton(data);
  }

  resetResult() {
    this.textContent = '';
    this.scrollTop = 0;
  }

  insertLoading(type) {
    if ($$('.skeleton', this).length) return;

    if (type === 'search') {
      this.resetResult();
    }

    this.insertAdjacentHTML('beforeend', TEMPLATE.SKELETON.repeat(10));
  }

  removeLoading() {
    $$('.skeleton', this).forEach((e) => e.remove());
  }

  hideStoredVideoSaveButton(videos) {
    videos.forEach((video) => {
      if (SavedVideo.instance.findVideo(video.id)) {
        $(`#${video.id}-save-button`).hidden = true;
      }
    });
  }
}

customElements.define('video-list', VideoList, { extends: 'ul' });

export default VideoList;
