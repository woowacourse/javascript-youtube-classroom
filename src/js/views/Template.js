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
        <button class="video-item__save-button button"></button>
      </li>
    `.repeat(10);
  }

  getNotFound() {
    return `
    <section class="search-result search-result--no-result">
        <h3 hidden>검색 결과 없음</h3>
        <div class="no-result">
          <img src="./src/assets/images/not_found.png" alt="no result image" class="no-result__image">
          <p class="no-result__description">
            검색 결과가 없습니다<br />
            다른 키워드로 검색해보세요
          </p>
        </div>
      </section>
    `;
  }

  getSavedVideo(savedVideo) {
    const [year, month, day] = savedVideo.publishTime.substr(0, 10).split('-');
    return `
      <li class="video-item" data-video-id=${savedVideo.videoId}>
          <iframe 
            class="video-item__thumbnail" 
            srcdoc="${this.getThumbnail(savedVideo.thumbnailUrl, savedVideo.videoId)}"
            frameborder="0"
            allow="autoplay"
            allowfullscreen>
          </iframe>
          <h4 class="video-item__title">${savedVideo.title}</h4>
          <p class="video-item__channel-name">${savedVideo.channelTitle}</p>
          <p class="video-item__published-date">${year}년 ${month}월 ${day}일</p>
          <div class="user-button-wrapper">
            <button class="user-saw-button">✅</button>
            <button class="user-delete-button">🗑️</button>
          </div>
      </li>
    `;
  }
}
