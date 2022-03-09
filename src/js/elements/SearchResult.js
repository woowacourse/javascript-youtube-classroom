import CustomElement from '../abstract/CustomElement';
import { addEvent, emit, $, $$ } from '../utils';
import TEMPLATE from '../templates';

class SearchResult extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_RESULT;
  }

  setEvent() {
    addEvent($('.video-list'), 'scroll', '.video-list', this.emitEvent);
  }

  emitEvent(e) {
    const { clientHeight } = $('.video-list');
    const { scrollTop, scrollHeight } = e.target;

    if (clientHeight + scrollTop >= scrollHeight && scrollTop !== 0) {
      emit('.video-list', '@scroll', {}, this);
    }
  }

  notify(type, data) {
    if (type === 'search') {
      this.resetResult();
      $('.video-list').scrollTop = 0;
    }

    this.removeSkeleton();
    this.insertVideoItems(data);
  }

  resetResult() {
    $('.video-list').textContent = '';
  }

  insertSkeleton() {
    $('.video-list').insertAdjacentHTML('beforeend', TEMPLATE.SKELETON.repeat(10));
  }

  removeSkeleton() {
    $$('.skeleton').forEach((e) => e.remove());
  }

  insertVideoItems(videos) {
    videos.forEach((video) => {
      $('.video-list').insertAdjacentHTML(
        'beforeend',
        `<video-item data-video=${JSON.stringify(video)}></video-item>`
      );
    });
  }
}

customElements.define('search-result', SearchResult);

export default SearchResult;
