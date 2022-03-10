import { $, $$ } from '../util';
import template from './template';

export default class SearchResultView {
  constructor() {
    this.isShownNoResult = false;
    this.bindEvents();
  }

  bindEvents() {
    $('#search-result-video-list').addEventListener('click', this.onClickVideoSaveButton.bind(this));
    $('#search-result-video-list').addEventListener('scroll', this.onScrollVideoList.bind(this));
  }

  onScrollVideoList() {
    const { scrollTop, clientHeight, scrollHeight } = $('#search-result-video-list');
    const searchOnScrollEvent = new CustomEvent('searchOnScroll', {
      detail: { scrollTop, clientHeight, scrollHeight },
    });
    window.dispatchEvent(searchOnScrollEvent);
  }

  onClickVideoSaveButton({ target }) {
    if (target.tagName === 'BUTTON') {
      const saveVideoEvent = new CustomEvent('saveVideo', {
        detail: { target },
      });
      window.dispatchEvent(saveVideoEvent);
    }
  }

  resetSearchResultVideoList() {
    $('#search-result-video-list').scrollTo(0, 0);
    $('#search-result-video-list').innerHTML = '';
  }

  updateOnLoading() {
    $('#search-result-video-list').insertAdjacentHTML('beforeend', template.skeletonListItem());
  }

  removeSkeletonListItem() {
    $$('.skeleton', $('#search-result-video-list')).forEach((listItem) => {
      listItem.remove();
    });
  }

  showSearchResultVideoList() {
    $('#no-result').classList.add('hide');
    $('#search-result-video-list').classList.remove('hide');
    $('#search-result').classList.remove('search-result--no-result');
    this.isShownNoResult = false;
  }

  showNoResult() {
    $('#no-result').classList.remove('hide');
    $('#search-result-video-list').classList.add('hide');
    $('#search-result').classList.add('search-result--no-result');
    this.isShownNoResult = true;
  }

  updateOnSearchDataReceived(videos) {
    if (videos.length === 0) {
      this.showNoResult();
      return;
    }
    if (this.isShownNoResult) {
      this.showSearchResultVideoList();
    }
    const listItems = videos.map((video) => template.videoListItem(video)).join('');

    this.removeSkeletonListItem();
    $('#search-result-video-list').insertAdjacentHTML('beforeend', listItems);
  }
}
