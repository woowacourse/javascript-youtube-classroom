import { YOUTUBE } from '../constants.js';

export function getVideoListTemplate(videoItems) {
  return videoItems.map(getVideoItemTemplate).join('');
}

function getVideoItemTemplate(videoItem) {
  return `
  <article class="clip">
    <div class="clip__preview">
      <iframe
        width="100%"
        height="118"
        src="https://www.youtube.com/embed/${videoItem.videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
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
        <div class="d-flex justify-end">
          <button class="btn clip__save-button">⬇️ 저장</button>
        </div>
      </div>
    </div>
  </article>
  `;
}

export function getSkeletonListTemplate() {
  return `
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>
  `.repeat(YOUTUBE.MAX_RESULT_COUNT);
}
