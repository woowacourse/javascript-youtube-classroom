import { $, $$ } from '../utils/dom.js';
import { emit } from '../utils/event.js';

export default class SearchResultView {
  constructor() {
    this.$videoList = $('.video-list');
    this.template = new Template();
    this.$skeletonWrapper = $('.skeleton-wrapper');
    this.$searchTarget = $('#search-target');
    this.newSavedIdList = [];

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // this.#scrollNextVideos();
          console.log('무한스크롤중');
          const { newSavedIdList } = this;
          emit(this.$searchTarget, '@scroll-bottom', { newSavedIdList });
        } else console.log('Not on the bottom');
      },
      {
        root: this.$videoList,
        threshold: 1.0,
      },
    );
  }

  renderVideo(newVideoItems) {
    this.$videoItems = $$('.skeleton');
    this.$videoItems.forEach((item, idx) => {
      item.classList.remove('skeleton');
      $('.video-item__thumbnail', item).setAttribute(
        'srcdoc',
        this.template.getThumbnail(newVideoItems[idx].thumbnailUrl, newVideoItems[idx].videoId),
      );
      $('.video-item__title', item).innerText = newVideoItems[idx].title;
      $('.video-item__channel-name', item).innerText = newVideoItems[idx].channelTitle;
      $('.video-item__published-date', item).innerText = newVideoItems[idx].publishTime;
      $('.video-item__save-button', item).innerText = '⬇ 저장'; // 고쳐야함 (저장 유무에 따라 달라짐)
      $('.video-item__save-button', item).addEventListener('click', this.handleSaveButton.bind(this));
      $('.video-item__save-button', item).dataset.id = newVideoItems[idx].videoId;
    });
  }

  handleSaveButton(event) {
    this.newSavedIdList.push(event.target.dataset.id);
    const { newSavedIdList } = this;
    const buttonElement = event.target;
    // 저장
    emit(this.$searchTarget, '@save-video', { newSavedIdList, buttonElement });
  }

  changeSaveButtonStyle($savedButton) {
    $savedButton.textContent = '저장됨';
    $savedButton.classList.add('saved-button');
  }

  removeVideo() {
    this.$videoList.replaceChildren();
  }

  showSkeleton() {
    this.$videoList.insertAdjacentHTML('beforeend', this.template.getSkeleton());
  }

  startObserve() {
    this.observer.observe(this.$videoList.lastElementChild);
  }

  stopObserve() {
    this.observer.unobserve(this.$videoList.lastElementChild);
  }
}
class Template {
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

  getSkeleton() {
    return `
      <li class="video-item skeleton" data-video-id="">
        <iframe 
          class="video-item__thumbnail" 
          srcdoc="" 
          frameborder="0"
          allow="autoplay"
          allowfullscreen>
        </iframe>
        <h4 class="video-item__title"></h4>
        <p class="video-item__channel-name"></p>
        <p class="video-item__published-date"></p>
        <button data-id="" class="video-item__save-button button"></button>
      </li>
    `.repeat(10);
  }
}
