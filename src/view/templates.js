import { YOUTUBE } from '../constants.js';

export function getVideoListTemplate(videos) {
  return videos.map(getSearchedVideoTemplate).join('');
}

export function getSelectedVideoListTemplate(videos) {
  return videos.map(getSelectedVideoTemplate).join('');
}

export function getSearchQueriesTemplate(queries) {
  return queries.map(getSearchQueryTemplate).join('');
}

export function getSearchQueryTemplate(query) {
  return `
    <a class="search-queries__chip mr-1">${query}</a>
  `;
}

function getSelectedVideoTemplate(videoItem) {
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
        <div>
          <span class="opacity-hover">✅</span>
          <span class="opacity-hover">👍</span>
          <span class="opacity-hover">💬</span>
          <span class="opacity-hover">🗑️</span>
        </div>
      </div>
    </div>
  </article>
  `;
}

function getSearchedVideoTemplate(videoItem) {
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
        <div class="d-flex justify-end ${videoItem.isSaved ? 'removed' : ''}">
          <button class="btn clip__save-button"
            data-video-id="${videoItem.videoId}"
            data-title="${videoItem.title}"
            data-channel-title="${videoItem.channelTitle}"
            data-published-at="${videoItem.publishedAt}"
          >⬇️ 저장</button>
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
