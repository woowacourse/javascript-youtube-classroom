import { $ } from '../utils/dom.js';
import { VALUE } from '../utils/constants.js';
import clipMaker from '../utils/clipMaker.js';
import { getRecentKeywords, getSavedVideoIds } from '../utils/localStorage.js';
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

  chipTemplate(recentKeywords) {
    return recentKeywords
      .map(
        (keyword, idx) => `<a id="chip-${idx + 1}" class="chip">${keyword}</a>`,
      )
      .join('');
  }

  updateChips() {
    const recentKeywords = getRecentKeywords();
    $('#chip-container').setInnerHTML(this.chipTemplate(recentKeywords));

    this.bindChipsEvent();
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
    const savedVideoIds = getSavedVideoIds();

    $('#saved-video-count').setText(savedVideoIds.length);
  }

  closeModal() {
    this.$element.removeClass('open');
  }

  renderVideoClips(videos) {
    $('.skeleton').hide();

    const savedVideoIds = getSavedVideoIds();
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

  showNoResult() {
    this.modalVideos.setInnerHTML(
      `
        <div class="empty"></div>
        <img class="not-found" src="./src/images/status/not_found.png"></img>
      `,
    );
  }
}
