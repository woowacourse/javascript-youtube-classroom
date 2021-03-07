import { $ } from '../utils/dom.js';
import { VALUE, STORAGE_KEYS } from '../utils/constants.js';
import throttle from '../utils/throttle.js';
import clipMaker from '../utils/clipMaker.js';
import { getValidJson } from '../utils/localStorage.js';
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
      this.emit('submitSearch', this.searchKeyword);
    });
  }

  bindScrollEvent() {
    this.modalVideos.setEvent(
      'scroll',
      throttle(function (event) {
        const { scrollTop, scrollHeight, offsetHeight } = event.target;

        if (scrollTop === scrollHeight - offsetHeight) {
          this.emit('scrollResult', this.searchKeyword);
        }
      }, VALUE.THROTTLE_TIME).bind(this),
    );
  }

  bindSaveEvent() {
    $('.clip-save-btn').setEvent('click', (e) => {
      e.target.setAttribute('disabled', true);
      const videoId = e.target.dataset.videoId;

      this.emit('clickSaveButton', videoId);
      this.updateSavedCount();
    });
  }

  bindChipsEvent() {
    $('.chip').setEvent('click', (e) => {
      const chipText = e.target.innerText;
      $('#modal-search-input').setValue(chipText);
      this.searchKeyword = chipText;
      this.clearVideoClips();

      this.emit('clickChip', chipText);
    });
  }

  openModal() {
    this.$element.addClass('open');
    this.updateSavedCount();
    this.clearVideoClips();

    const latestKeyword = $('#chip-1').getText();

    if (latestKeyword) {
      this.searchKeyword = latestKeyword;

      $('#modal-search-input').setValue(latestKeyword);
      this.emit('openModal', latestKeyword);
    }
  }

  updateSavedCount() {
    const savedVideoIds = getValidJson(STORAGE_KEYS.SAVED_VIDEO_IDS, []);

    $('#saved-video-count').setText(savedVideoIds.length);
  }

  chipTemplate(recentKeywords) {
    return recentKeywords
      .map(
        (keyword, idx) => `<a id="chip-${idx + 1}" class="chip">${keyword}</a>`,
      )
      .join('');
  }

  updateChips() {
    const recentKeywords = getValidJson(STORAGE_KEYS.RECENT_KEYWORDS, []);
    $('#chip-container').setInnerHTML(this.chipTemplate(recentKeywords));

    this.bindChipsEvent();
  }

  scrollToTop() {
    this.modalVideos.each((container) => (container.scrollTop = 0));
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
    this.modalVideos.addInnerHTML(
      this.skeletonTemplate().repeat(VALUE.CLIPS_PER_SCROLL),
    );
  }

  renderVideoClips(videos) {
    $('.skeleton').hide();

    const savedVideoIds = getValidJson(STORAGE_KEYS.SAVED_VIDEO_IDS, []);
    const videoClips = videos
      .map((video) => {
        const isSaved = savedVideoIds.includes(video.id);

        return clipMaker(video, { isModal: true, isSaved: isSaved });
      })
      .join('');
    this.modalVideos.addInnerHTML(videoClips);
    this.bindSaveEvent();
  }

  clearVideoClips() {
    this.modalVideos.setInnerHTML('');
  }

  showNoResult() {
    this.modalVideos.setInnerHTML(
      `
        <div class="empty"></div>
        <img class="not-found" src="./src/images/status/not_found.png"></img>
      `,
    );
  }

  closeModal() {
    this.$element.removeClass('open');
  }
}
