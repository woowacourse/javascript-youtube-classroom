import getRelativeDate from '../utils/date';

export default class Template {
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
          font-size: 1em;
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
      <img src=${imgUrl} loading='lazy'>
        <div class='play'></div>
      </a>
    `;
  }

  getSkeleton() {
    return `
      <li class="video-item skeleton">
        <iframe 
          class="video-item__thumbnail" 
          srcdoc="" 
          frameborder="0"
          allow="autoplay"
          loading="lazy"
          allowfullscreen>
        </iframe>
        <h4 class="video-item__title"></h4>
        <p class="video-item__channel-name"></p>
        <p class="video-item__published-date"></p>
        <button data-id="" class="video-item__save-button button"></button>
      </li>
    `.repeat(10);
  }

  getVideoItem({ title, channelTitle, publishTime, videoId, thumbnailUrl }) {
    return `
      <div id="${videoId}" class="video-item">
        <iframe 
          class="video-item__thumbnail" 
          srcdoc="${this.getThumbnail(thumbnailUrl, videoId)}" 
          frameborder="0"
          allow="autoplay"
          loading="lazy"
          allowfullscreen>
        </iframe>
        <h4 class="video-item__title">${title}</h4>
        <p class="video-item__channel-name">${channelTitle}</p>
        <p class="video-item__published-date">${getRelativeDate(publishTime)}</p>
        <button id="${videoId}" class="button video-item__button  video-item__button--watched">✅</button>
        <button id="${videoId}" class="button video-item__button video-item__button--delete">🗑️</button>
      </div>
    `;
  }

  getConfirmModal(title) {
    return `
      <div class="confirm-modal">
        <form class="confirm-modal__form">
          <div class="confirm-modal__content">
            <span class="confirm-modal__span">[${title}]
            <br/>해당 영상을 저장 목록에서<br />삭제하시겠습니까?</span>
          
            <div class="confirm-modal__clear-fix">
              <button type="button" class="button confirm-modal__cancel-button">취소하기</button>
              <button type="button" class="button confirm-modal__delete-button">삭제하기</button>
            </div>
          </div>
        </form>
      </div>
    `;
  }
}
