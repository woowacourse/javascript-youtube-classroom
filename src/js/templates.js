import { generateCSSClass } from './utils.js';

export const getVideoPlayerTemplate = (id) => {
  return `
    <iframe
      width="80%"
      height="80%"
      src="https://www.youtube.com/embed/${id}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;
};

export const getVideoTemplate = (data, options) => {
  const { id, title, channelId, channelTitle, dateString, thumbnailURL } = data;
  const {
    containsSaveButton = false,
    containsMenu = false,
    isSaved = false,
    isWatched = false,
    isLiked = false,
  } = options;

  return `
    <article class="clip d-flex flex-col" data-video-id="${id}">
      <div class="preview-container" data-src="${thumbnailURL}">
        <div class="dimmed"></div>
        <button class="play-button" />
      </div>
      <div class="content-container pt-2 px-1 d-flex flex-col justify-between flex-1">
        <div>
          <h3 class="video-title">${title}</h3>
          <a
            href="https://www.youtube.com/channel/${channelId}"
            target="_blank"
            class="channel-name mt-1"
          >
            ${channelTitle}
          </a>
          <div class="meta">
            <p>${dateString}</p>
          </div>
        </div>
        ${
          containsSaveButton
            ? `
              <div class="d-flex justify-end">
                <button class="btn btn-save ${isSaved ? 'hidden' : ''}" data-video-id="${id}">⬇️ 저장</button>
              </div>
            `
            : ''
        }
        ${
          containsMenu
            ? `
            <div class="menu-list" data-video-id="${id}"}>
              <span class="cursor-pointer ${generateCSSClass(!isWatched, 'opacity-hover')} watched">✅</span>
              <span class="cursor-pointer ${generateCSSClass(!isLiked, 'opacity-hover')} like">👍</span>
              <span class="cursor-pointer opacity-hover delete">🗑️</span>
            </div>
          `
            : ''
        }
      </div>
    </article>
  `;
};

export const getFormTemplate = () => {
  return `
    <form id="youtube-search-form" class="d-flex">
      <input
        type="text"
        id="youtube-search-keyword-input"
        class="w-100 mr-2 pl-2"
        name="keyword"
        placeholder="검색"
        required
      />
      <button type="submit" class="btn bg-cyan-500">검색</button>
    </form>
  `;
};

export const getNoResultTemplate = () => {
  return `
    <div class="no-result">
      <img src="./src/images/status/not_found.png" alt="검색 결과 없음" />
      <p><strong>검색 결과가 없습니다</strong></p>
    </div>
  `;
};

export const getEmptySearchResultTemplate = () => {
  return `
    <div class="youtube-search-result video-wrapper">
      <div class="sentinel"></div>
    </div>
  `;
};

export const getRecentKeywordTemplate = (keyword) => {
  return `<a class="chip">${keyword}</a>`;
};
