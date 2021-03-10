export const getVideoTemplate = (data, options) => {
  const { id, title, channelId, channelTitle, dateString } = data;
  const { containsSaveButton = false, containsMenu = false, isSaved = false } = options;

  return `
    <article class="clip d-flex flex-col">
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${id}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
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
              <div>
                <span class="opacity-hover">✅</span>
                <span class="opacity-hover">👍</span>
                <span class="opacity-hover">💬</span>
                <span class="opacity-hover">🗑️</span>
              </div>
            `
              : ''
          }
        </div>
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
  return `<div class="youtube-search-result video-wrapper"></div>`;
};

export const getRecentKeywordTemplate = (keyword) => {
  return `<a class="chip">${keyword}</a>`;
};
