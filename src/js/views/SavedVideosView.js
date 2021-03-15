import { $ } from '../utils/dom.js';
import { VALUE } from '../utils/constants.js';
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
        videoLike: this.bindLikeEvent.bind(this),
        videoDelete: this.bindDeleteEvent.bind(this),
      };

      Object.entries(e.target.dataset).forEach(([buttonType, videoId]) => {
        buttonPack[buttonType](videoId);
      });
    });
  }

  bindWatchedEvent(videoId) {
    this.emit('clickWatched', videoId);
    $(`[data-article="${videoId}"] iframe`).each((iframe) => stopVideo(iframe));
  }

  bindLikeEvent(videoId) {
    this.emit('clickLike', videoId);
  }

  bindDeleteEvent(videoId) {
    this.emit('clickDelete', videoId);
  }

  renderSavedVideoClips(savedVideos, watchedVideos, likedVideos) {
    const savedVideoClips = savedVideos
      .map((video) => {
        const isWatched = watchedVideos.includes(video.id);
        const isLiked = likedVideos.includes(video.id);

        return clipMaker(video, { isModal: false, isWatched, isLiked });
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

  showMatchedVideos(currentTabVideos) {
    const savedVideos = $('#main-videos > article');

    clearTimeout(this.clipTransition);
    $('.empty-videos').hide();
    savedVideos.removeClass('fadein', 'fadeout');
    savedVideos.addClass('fadeout');

    this.clipTransition = setTimeout(() => {
      savedVideos.hide();
      currentTabVideos.forEach((currentTabVideo) => {
        $(`[data-article='${currentTabVideo}']`).show().addClass('fadein');
      });
    }, VALUE.CLIP_TRANSITION_TIME);
  }

  renderVideoEmptyImg() {
    this.$element.addInnerHTML(
      `
        <div class="empty-videos stretch d-flex flex-col items-center d-none">
          <img width="50%" src="./src/images/status/empty_tung.png" alt="동영상 목록이 비었읍니다."></img>
          <h2>동영상 목록이 비었읍니다 🙄</h2>
        </div>
      `,
    );
  }

  showVideoEmptyImg() {
    setTimeout(() => {
      $('.empty-videos').show();
    }, VALUE.CLIP_TRANSITION_TIME);
  }

  toggleWatchedButton(videoId) {
    const videoClip = $(`[data-article='${videoId}']`);
    const packButton = $(`[data-video-watched='${videoId}']`);

    $('#main-videos > article').removeClass('fadein', 'fadeout');
    packButton.toggleClass('opacity-hover');
    videoClip.addClass('fadeout');

    setTimeout(() => {
      videoClip.hide();
    }, VALUE.CLIP_TRANSITION_TIME);
  }

  toggleLikeButton(videoId) {
    $('#main-videos > article').removeClass('fadein', 'fadeout');
    $(`[data-video-like='${videoId}']`).toggleClass('opacity-hover');
  }
}
