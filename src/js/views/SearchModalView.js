import { $ } from '../utils/dom.js';
import { VALUE } from '../utils/constants.js';
import clipMaker from '../utils/clipMaker.js';
import View from './View.js';

export default class SearchModalView extends View {
  constructor($element) {
    super($element);
    this.closeButton = $('.modal-close');
    this.searchForm = $('#modal-search-form');
    this.bindModalEvents();
  }

  bindModalEvents() {
    this.closeButton.setEvent('click', () => {
      this.closeModal();
      this.emit('closeModal');
    });

    this.searchForm.setEvent('submit', (e) => {
      e.preventDefault();

      const searchKeyword = e.target.elements.search.value;

      this.emit('submitSearch', searchKeyword);
      this.setRecentChip(searchKeyword);
      this.updateChips();
    });
  }

  setRecentChip(searchKeyword) {
    const recentKeywords = localStorage.getItem('searchKeyword')
      ? JSON.parse(localStorage.getItem('searchKeyword'))
      : [];

    if (recentKeywords.includes(searchKeyword)) {
      return;
    }

    if (recentKeywords.length >= VALUE.KEYWORD_COUNT) {
      recentKeywords.pop();
    }

    recentKeywords.unshift(searchKeyword);
    localStorage.setItem('searchKeyword', JSON.stringify(recentKeywords));
  }

  chipTemplate(recentKeywords) {
    return recentKeywords
      .map((keyword) => `<a class="chip">${keyword}</a>`)
      .join('');
  }

  updateChips() {
    const recentKeywords = JSON.parse(localStorage.getItem('searchKeyword'));

    $('#chip-container').setInnerHTML(this.chipTemplate(recentKeywords));
  }

  openModal() {
    this.$element.addClass('open');
  }

  closeModal() {
    this.$element.removeClass('open');
  }

  renderVideoClips(videos) {
    const videoClips = videos.map((video) => clipMaker(video)).join('');
    $('#modal-videos').setInnerHTML(videoClips);
  }

  skeletonTemplate() {
    return `
      <div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>
    `;
  }

  startSearch() {
    $('#modal-videos').setInnerHTML(
      this.skeletonTemplate().repeat(VALUE.CLIPS_PER_SCROLL),
    );
  }
}
