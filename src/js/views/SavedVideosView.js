import { $ } from '../utils/dom.js';
import clipMaker from '../utils/clipMaker.js';
import stopVideo from '../utils/stopVideo.js';
import View from './View.js';

export default class SavedVideosView extends View {
  constructor($element) {
    super($element);
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $('#main-videos').setEvent('click', (e) => {
      if (!e.target.classList.contains('pack-button')) return;

      const buttonPack = {
        videoWatched: this.bindWatchedEvent.bind(this),
        videoDelete: this.bindDeleteEvent.bind(this),
      };

      const buttonDataset = e.target.dataset;
      Object.entries(buttonDataset).forEach(([key, value]) => {
        if (Object.keys(buttonPack).includes(key)) buttonPack[key](value);
      });
    });
  }

  bindWatchedEvent(videoId) {
    this.emit('clickWatched', videoId);
    $(`[data-article="${videoId}"] iframe`).each((iframe) => stopVideo(iframe));
  }

  bindDeleteEvent(videoId) {
    this.emit('clickDelete', videoId);
  }

  renderSavedVideoClips(savedVideos, watchedVideos) {
    const savedVideoClips = savedVideos
      .map((video) => {
        const isWatched = watchedVideos.includes(video.id);

        return clipMaker(video, { isModal: false, isWatched });
      })
      .join('');

    this.$element.addInnerHTML(savedVideoClips);
  }

  addSavedVideoClip(video) {
    this.$element.addInnerHTML(clipMaker(video, { isModal: false }));
  }

  removeSavedVideoClip(videoId) {
    $(`[data-article='${videoId}']`).removeElement();
  }

  showMatchedVideos(prevTabVideos, currentTabVideos) {
    $('.empty-videos').hide();
    $('#main-videos > article').addClass('hidden');

    prevTabVideos.forEach((prevTabVideo) => {
      $(`[data-article='${prevTabVideo}']`).hide();
    });
    currentTabVideos.forEach((currentTabVideo) => {
      $(`[data-article='${currentTabVideo}']`).show().addClass('visible');
    });
  }

  renderVideoEmptyImg() {
    this.$element.addInnerHTML(
      `
        <div class="empty-videos stretch d-flex flex-col items-center d-none">
          <img width="50%" src="./src/images/status/empty_tung.png" alt="empty_video_img"></img>
          <h2>동영상 목록이 비었읍니다 🙄</h2>
        </div>
      `,
    );
  }

  showVideoEmptyImg() {
    $('.empty-videos').show();
  }

  toggleWatchedButton(videoId) {
    const videoClip = $(`[data-article='${videoId}']`);
    const packButton = $(`[data-video-watched='${videoId}']`);

    packButton.toggleClass('opacity-hover');
    videoClip.hide();
  }
}
