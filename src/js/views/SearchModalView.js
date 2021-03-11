import { $ } from '../utils/dom.js';
import { VALUE } from '../utils/constants.js';
import throttle from '../utils/throttle.js';
import clipMaker from '../utils/clipMaker.js';
import View from './View.js';

export default class SearchModalView extends View {
  constructor($element) {
    super($element);

    this.closeButton = $('.modal-close');
    this.searchForm = $('#modal-search-form');
    this.modalVideos = $('#modal-videos');
    this.searchKeyword;
  }

  init() {
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
        const isBottomOfScroll = scrollTop === scrollHeight - offsetHeight;

        if (isBottomOfScroll) {
          this.emit('scrollResult', this.searchKeyword);
        }
      }, VALUE.THROTTLE_TIME).bind(this),
    );
  }

  bindSaveEvent(videos) {
    videos.forEach((video) => {
      $(`[data-video-save='${video.id}']`).setEvent('click', (e) => {
        this.emit('clickSaveButton', e.target);
      });
    });
  }

  bindChipsEvent() {
    $('.chip').setEvent('click', (e) => {
      const chipText = e.target.innerText;
      $('#modal-search-input').setValue(chipText);
      this.searchKeyword = chipText;

      this.emit('clickChip', chipText);
    });
  }

  openModal() {
    this.$element.addClass('open');

    try {
      const latestKeyword = $('#chip-1').getText();

      this.searchKeyword = latestKeyword;
      $('#modal-search-input').setValue(latestKeyword);

      this.emit('openModal', latestKeyword);
    } catch (err) {
      console.error(err);
      return;
    }
  }

  disableSaveButton(target) {
    target.setAttribute('disabled', true);
  }

  updateSavedCount(savedVideos) {
    $('#saved-video-count').setText(savedVideos.length);
  }

  chipTemplate(recentKeywords) {
    return recentKeywords
      .map(
        (keyword, idx) => `<a id="chip-${idx + 1}" class="chip">${keyword}</a>`,
      )
      .join('');
  }

  updateChips(recentKeywords) {
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

  renderVideoClips(videos, savedVideos) {
    $('.skeleton').removeElement();

    const videoClips = videos
      .map((video) => {
        const isSaved = savedVideos.includes(video.id);

        return clipMaker(video, { isModal: true, isSaved });
      })
      .join('');
    this.modalVideos.addInnerHTML(videoClips);
    this.bindSaveEvent(videos);
  }

  clearVideoClips() {
    this.modalVideos.setInnerHTML('');
  }

  showNoResult() {
    this.modalVideos.setInnerHTML(
      `
        <div class="not-found stretch d-flex flex-col items-center">
          <img src="./src/images/status/not_found.png" alt="not-found-img"></img>
          <h2>검색 결과가 없읍니다.</h2>
        </div>
      `,
    );
  }

  closeModal() {
    this.$element.removeClass('open');
  }
}
