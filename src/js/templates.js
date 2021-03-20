import { generateCSSClass } from './utils.js';

export const getVideoTemplate = (data, options) => {
  const { id, title, channelId, channelTitle, dateString, thumbnail } = data;
  const {
    isContainingSaveButton = false,
    isContainingMenu = false,
    isSaved = false,
    isWatched = false,
    isLiked = false,
  } = options;

  return `
    <article class="clip d-flex flex-col" data-video-id="${id}">
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          data-video-url="https://www.youtube.com/embed/${id}"
          srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href='https://www.youtube.com/embed/${id}?autoplay=1'><img src='${thumbnail}'><span>▶</span></a>"
          >
        </iframe>
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
          isContainingSaveButton
            ? `
              ${
                isSaved
                  ? `
                  <div class="d-flex justify-end">
                    <button class="btn saving-btn btn-cancel-save" data-video-id="${id}">⬆️ 저장 취소</button>
                  </div>
                `
                  : `
                  <div class="d-flex justify-end">
                    <button class="btn saving-btn btn-save" data-video-id="${id}">⬇️ 저장</button>
                  </div>
                `
              }
            `
            : ''
        }
        ${
          isContainingMenu
            ? `
            <div class="menu-list" data-video-id="${id}"}>
              <span class="cursor-pointer ${generateCSSClass(!isWatched, 'opacity-hover')} watched">✅</span>
              <span class="cursor-pointer ${generateCSSClass(!isLiked, 'opacity-hover')} liked">👍</span>
              <span class="cursor-pointer opacity-hover comment">💬</span>
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
    </div>
    <div class="sentinel"></div>
  `;
};

export const getRecentKeywordTemplate = (keyword) => {
  return `<a class="chip">${keyword}</a>`;
};
