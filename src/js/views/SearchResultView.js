import { $, $$ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

export default class SearchResultView {
  constructor() {
    this.$videoList = $('.video-list');
    this.template = new Template();
    this.$skeletonWrapper = $('.skeleton-wrapper');
    this.$searchTarget = $('#search-target');
  }

  renderVideo(videoItems) {
    const videosTemplate = videoItems.map((item) => this.template.getVideo(item)).join('');
    this.$videoList.insertAdjacentHTML('beforeend', videosTemplate);
    //     export const on = (target, eventName, handler) => {
    //   target.addEventListener(eventName, handler);
    $$('.video-item__save-button').forEach((button) => {
      on(button, 'click', this.saveVideo);
    });
  }

  saveVideo() {
    console.log(this.dataset.id);
    const { id } = this.dataset;
    emit(this, '@save-video', { id });
  }

  removeVideo() {
    this.$videoList.replaceChildren();
  }
}
class Template {
  getSkeleton(count) {
    return `
      <div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
        <p class="line"></p>
      </div>
      `.repeat(count);
  }

  getThumbnail(imgUrl, videoId) {
    return `
      <style>
        * {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        body {
          position: relative; 
        }

        img {
          object-fit: cover;
          width: 100%;
          height: 135px;
        }

        .play { 
          position: absolute; 
          top: 30%;
          left: 37%;
          background: gray;
          border-radius: 50% / 10%;
          color: #FFFFFF;
          font-size: 1em; /* change this to change size */
          height: 3em;
          padding: 0;
          text-align: center;
          text-indent: 0.1em;
          transition: all 150ms ease-out;
          width: 4em;
        }

        .play:hover {
          background: red;
        }

        .play::before { 
          background: inherit;
          border-radius: 5% / 50%;
          bottom: 9%;
          content: '';
          left: -5%;
          position: absolute;
          right: -5%;
          top: 9%;
        }

        .play::after {
          border-style: solid;
          border-width: 1em 0 1em 1.732em;
          border-color: transparent transparent transparent rgba(255, 255, 255, 0.75);
          content: ' ';
          font-size: 0.75em;
          height: 0;
          margin: -1em 0 0 -0.75em;
          top: 50%;
          position: absolute;
          width: 0;
        }

      </style>
      <a href='https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1'>
      <img src=${imgUrl}>
        <div class='play'></div>
      </a>
    `;
  }

  getVideo({ snippet, id }, isSaved = false) {
    return `
    <li class="video-item" data-video-id="">
      <iframe 
        class="video-item__thumbnail" 
        srcdoc="${this.getThumbnail(snippet.thumbnails.high.url, id.videoId)}" 
        frameborder="0"
        allow="autoplay"
        allowfullscreen>
      </iframe>
      <h4 class="video-item__title">${snippet.title}</h4>
      <p class="video-item__channel-name">${snippet.channelTitle}</p>
      <p class="video-item__published-date">${snippet.publishTime}</p>
      <button data-id="${id.videoId}" class="video-item__save-button button">${isSaved ? '저장됨' : '⬇ 저장'}</button>
    </li>
    `;
  }
}
