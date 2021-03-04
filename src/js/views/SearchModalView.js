import { $ } from '../utils/dom.js';
import { VALUE } from '../utils/constants.js';
import clipMaker from '../utils/clipMaker.js';
import View from './View.js';

export default class SearchModalView extends View {
  constructor($element) {
    super($element);

    this.closeButton = $('.modal-close');
    this.searchForm = $('#modal-search-form');
    this.modalVideos = $('#modal-videos');
    this.searchKeyword;

    this.updateChips();
    this.bindModalEvents();
    this.bindScrollEvent();
  }

  bindModalEvents() {
    this.closeButton.setEvent('click', () => {
      this.closeModal();
      this.emit('closeModal');
    });

    this.searchForm.setEvent('submit', (e) => {
      e.preventDefault();

      this.searchKeyword = e.target.elements.search.value;

      this.clearVideoClips();
      this.emit('submitSearch', this.searchKeyword);
      this.setRecentChip();
      this.updateChips();
    });
  }

  bindScrollEvent() {
    let throttle;

    this.modalVideos.setEvent('scroll', (e) => {
      if (throttle) return;

      const { scrollTop, scrollHeight, offsetHeight } = e.target;
      if (scrollTop === scrollHeight - offsetHeight) {
        throttle = setTimeout(() => {
          throttle = null;
        }, VALUE.THROTTLE_TIME);

        this.emit('scrollResult', this.searchKeyword);
      }
    });
  }

  setRecentChip() {
    const recentKeywords = this.getRecentKeywords();

    if (recentKeywords.includes(this.searchKeyword)) {
      return;
    }

    if (recentKeywords.length >= VALUE.KEYWORD_COUNT) {
      recentKeywords.pop();
    }

    recentKeywords.unshift(this.searchKeyword);
    localStorage.setItem('searchKeyword', JSON.stringify(recentKeywords));
  }

  chipTemplate(recentKeywords) {
    return recentKeywords
      .map(
        (keyword, idx) => `<a id="chip-${idx + 1}" class="chip">${keyword}</a>`,
      )
      .join('');
  }

  updateChips() {
    const recentKeywords = this.getRecentKeywords();

    $('#chip-container').setInnerHTML(this.chipTemplate(recentKeywords));
  }

  getRecentKeywords() {
    return localStorage.getItem('searchKeyword')
      ? JSON.parse(localStorage.getItem('searchKeyword'))
      : [];
  }

  openModal() {
    this.$element.addClass('open');

    const latestKeyword = $('#chip-1').getText();

    if (latestKeyword) this.emit('openModal', latestKeyword);
  }

  closeModal() {
    this.$element.removeClass('open');
  }

  renderVideoClips(videos) {
    $('.skeleton').hide();
    const videoClips = videos
      .map((video) => clipMaker(video, { isModal: false }))
      .join('');
    this.modalVideos.addInnerHTML(videoClips);
  }

  clearVideoClips() {
    this.modalVideos.setInnerHTML('');
  }

  skeletonTemplate() {
    return `
      <div class="skeleton" loading="lazy">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>
    `;
  }

  startSearch() {
    this.modalVideos.addInnerHTML(
      this.skeletonTemplate().repeat(VALUE.CLIPS_PER_SCROLL),
    );
  }

  showNoResult() {
    this.modalVideos.setInnerHTML(
      `
        <div class="empty"></div>
        <img class="not-found" src="./src/images/status/not_found.png"></img>
      `,
    );
  }
}
