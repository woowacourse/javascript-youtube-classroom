import { SELECTOR_CLASS, STYLE_CLASS } from '../constants';
import BasicView from './BasicView';
import { GetVideoIframeMixin } from './mixin';

export default class VideoView extends GetVideoIframeMixin(BasicView) {
  #isChecked;

  constructor({ $videoWrapper, $emptyVideoImage }, isChecked) {
    super({ $videoWrapper, $emptyVideoImage });

    this.#isChecked = isChecked;
  }

  renderVideos(videos) {
    this.renderHTML(this._element.$videoWrapper, '');
    this.renderHTML(
      this._element.$videoWrapper,
      this._getVideoListTemplate(videos, this.#isChecked)
    );
  }

  eraseVideos() {
    this.renderHTML(this._element.$videoWrapper, '');
  }

  showEmptyVideoImage() {
    this.showElement(this._element.$emptyVideoImage);
  }

  hideEmptyVideoImage() {
    this.hideElement(this._element.$emptyVideoImage);
  }

  _getVideoListTemplate(videos, isWatched) {
    return videos
      .map(video => this._getVideoTemplate(video, isWatched))
      .join('');
  }

  _getVideoTemplate(videoItem, isWatched) {
    return `
    <article class="${SELECTOR_CLASS.CLIP} clip">
      <div class="clip__preview">
        ${this._getIframe(videoItem)}
      </div>
      <div class="clip__content pt-2 px-1">
        <h3>${videoItem.title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
            target="_blank"
            class="channel-name mt-1"
          >
            ${videoItem.channelTitle}
          </a>
          <div class="meta">
            <p>${videoItem.publishedAt}</p>
          </div>
          <div>
            <button 
              class="
                ${SELECTOR_CLASS.CLIP_CHECK_BUTTON}
                clip__check-button
                button-style-none
                ${isWatched ? STYLE_CLASS.VIDEO_CHECKED : ''} 
                opacity-hover" 
              data-video-id="${videoItem.videoId}"
              data-storage-keyword-for-sending="${
                isWatched ? 'watching' : 'watched'
              }"
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
              data-video-id="${videoItem.videoId}"
              aria-label="해당 비디오를 삭제"
            >🗑️</button>
          </div>
        </div>
      </div>
    </article>
    `;
  }
}
