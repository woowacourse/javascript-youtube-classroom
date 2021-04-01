import {
  CONTROLLER_KEYWORD,
  SELECTOR_CLASS,
  STORAGE_KEYWORD,
  STYLE_CLASS,
} from '../constants';
import BasicView from './BasicView';
import { GetVideoIframeMixin } from './mixin';
import { $videoWrapper, $emptyVideo } from '../elements.js';

export default class VideoView extends GetVideoIframeMixin(BasicView) {
  #isChecked;

  constructor() {
    super();
  }

  renderVideos(videos) {
    this.renderHTML($videoWrapper, '');
    this.renderHTML(
      $videoWrapper,
      this._getVideoListTemplate(videos, this.#isChecked)
    );
  }

  eraseVideos() {
    this.renderHTML($videoWrapper, '');
  }

  showEmptyVideoImage() {
    this.showElement($emptyVideo);
  }

  hideEmptyVideoImage() {
    this.hideElement($emptyVideo);
  }

  _getVideoListTemplate(videos) {
    return videos.map(video => this._getVideoTemplate(video)).join('');
  }

  _getVideoTemplate(video) {
    const isWatched = video[STORAGE_KEYWORD.IS_WATCHED];

    return `
    <article class="${SELECTOR_CLASS.CLIP} clip">
      <div class="clip__preview">
        ${this._getIframe(video)}
      </div>
      <div class="clip__content pt-2 px-1">
        <h3>${video.title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
            target="_blank"
            class="channel-name mt-1"
          >
            ${video.channelTitle}
          </a>
          <div class="meta">
            <p>${video.publishedAt}</p>
          </div>
          <div>
            <button 
              class="
                ${SELECTOR_CLASS.CLIP_CHECK_BUTTON}
                clip__check-button
                button-style-none
                ${isWatched ? STYLE_CLASS.VIDEO_CHECKED : ''} 
                opacity-hover" 
              data-video-id="${video.videoId}"
              aria-label="해당 비디오를 ${
                isWatched ? '볼 영상으로 저장' : '본 영상으로 저장'
              }"
            >✅</button>
            <button class="opacity-hover button-style-none">👍</button>
            <button class="opacity-hover button-style-none">💬</button>
            <button 
              class="${
                SELECTOR_CLASS.CLIP_DELETE_BUTTON
              } opacity-hover button-style-none" 
              data-video-id="${video.videoId}"
              aria-label="해당 비디오를 삭제"
            >🗑️</button>
          </div>
        </div>
      </div>
    </article>
    `;
  }
}
