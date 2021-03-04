import { escapeApostrophe } from '../utils/util.js';

// TODO : 템플릿도 나중에 폴더만들어서 사용되는 곳대로 나누기
export const searchVideoTemplate = (info, save) => {
  return `<article class="clip skeleton">
            <div class="preview-container image">
                <iframe
                width="100%"
                height="118"
                src='https://www.youtube.com/embed/${info.url}'
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                ></iframe>
            </div>
            <div class="content-container pt-2 px-1">
                <h3 class="line"">${info.title}</h3>
                <div>
                    <a
                        href="https://www.youtube.com/channel/${info.channelId}"
                        target="_blank"
                        class="channel-name mt-1 line"
                    >
                        ${info.channelTitle}
                    </a>
                    <div class="meta">
                        <p class="line">${info.publishTime}</p>
                    </div>
                    <div class="d-flex justify-end">
                        <button class="btn js-save-button ${
                          save ? 'invisible' : ''
                        }" data-info='${escapeApostrophe(
    info
  )}'>⬇️ 저장</button>
                    </div>
                </div>
            </div>
            </article>`;
};

export const searchNotFoundTemplate = () => {
  return `<img id="search-not-found" src="./src/images/status/not_found.png" />`;
};

export const recentKeywordsTemplate = keywords => {
  return `
    <span class="text-gray-700">최근 검색어: </span>
    ${keywords
      .map(keyword => {
        return `<a class="chip">${keyword}</a>`;
      })
      .join('')}

    `;
};

export const myVideoInfosTemplate = length => {
  return `<div class="d-flex justify-end text-gray-700">
            저장된 영상 갯수: ${length}개
          </div>`;
};
