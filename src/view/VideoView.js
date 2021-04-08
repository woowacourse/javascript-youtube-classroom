import { SELECTOR_CLASS, STYLE_CLASS, YOUTUBE } from '../constants';
import BasicView from './BasicView';

export default class VideoView extends BasicView {
  constructor({ $videoWrapper, $emptyVideoImage }) {
    super({ $videoWrapper, $emptyVideoImage });
  }

  renderVideos(videos) {
    this.renderHTML(this._element.$videoWrapper, '');
    this.renderHTML(this._element.$videoWrapper, this._getVideoListTemplate(videos));
  }

  renderSkeletonItems() {
    this.renderHTML(this._element.$videoWrapper, this._getSkeletonListTemplate());
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

  _getVideoListTemplate(videos) {
    return videos.map(video => this._getVideoTemplate(video)).join('');
  }

  _getSkeletonListTemplate() {
    return `
      <div class="${SELECTOR_CLASS.SKELETON} skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>
    `.repeat(YOUTUBE.MAX_RESULT_COUNT);
  }

  _getVideoTemplate(video) {
    return `
    <article class="${SELECTOR_CLASS.SAVED_CLIP} clip">
      <div class="clip__preview">
        <img class="clip__thumbnail" src="${video.thumbnail}" loading="lazy" />
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${video.videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
      <div class="clip__content py-2 px-4">
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
            <span 
              class="
                ${video.isChecked ? SELECTOR_CLASS.SAVED_CLIP_UNCHECK_BUTTON : SELECTOR_CLASS.SAVED_CLIP_CHECK_BUTTON}
                clip__check-button
                ${video.isChecked ? STYLE_CLASS.CHECKED : ''} 
                opacity-hover
              " 
              data-video-id="${video.videoId}"
            >✅</span>
            <span 
              class="
                ${video.isLiked ? SELECTOR_CLASS.SAVED_CLIP_CANCEL_LIKE_BUTTON : SELECTOR_CLASS.SAVED_CLIP_LIKE_BUTTON}
                clip__check-button
                ${video.isLiked ? STYLE_CLASS.LIKED : ''} 
                opacity-hover
              "
              data-video-id="${video.videoId}"
            >👍</span>
            <span class="opacity-hover">💬</span>
            <span 
              class="
                ${SELECTOR_CLASS.SAVED_CLIP_DELETE_BUTTON} 
                opacity-hover
              " 
              data-video-id="${video.videoId}"
            >🗑️</span>
          </div>
        </div>
      </div>
    </article>
    `;
  }
}
