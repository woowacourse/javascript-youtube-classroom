import { YOUTUBE, SELECTOR_CLASS } from '../constants.js';

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
    <a class="${SELECTOR_CLASS.SEARCH_QUERIES_CHIP} search-queries__chip mr-2">${query}</a>
  `;
}

function getSelectedVideoTemplate(videoItem) {
  return `
  <article class="${SELECTOR_CLASS.CLIP} clip">
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
          <span 
          class="${SELECTOR_CLASS.CLIP_CHECK_BUTTON} opacity-hover" 
          data-video-id="${videoItem.videoId}"
          >✅</span>
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
  <article class="${SELECTOR_CLASS.SEARCHED_CLIP} clip">
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
          <button class="btn ${SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON}"
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
    <div class="${SELECTOR_CLASS.SKELETON} skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>
  `.repeat(YOUTUBE.MAX_RESULT_COUNT);
}
