import { convertDateFormat } from '../utils/util.js';
import { CLASS } from '../constants/constant.js';

// TODO: 템플릿도 나중에 폴더만들어서 사용되는 곳대로 나누기
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
                    class="channel-name mt-1 line">
                    ${info.channelTitle}
                  </a>
                  <div class="meta">
                    <p class="line">${convertDateFormat(info.publishTime)}</p>
                  </div>
                  <div class="d-flex justify-end">
                    <button class="btn js-save-button ${
                      save ? CLASS.INVISIBLE : ''
                    }" 
                    data-url="${info.url}"
                    data-channelId="${info.channelId}"
                    data-channelTitle="${info.channelTitle}"
                    data-publishTime="${convertDateFormat(
                      info.publishTime
                    )}">⬇️ 저장</button>
                  </div>
                </div>
              </div>
            </article>`;
};

export const recentKeywordsTemplate = keywords => {
  return `
    <span class="text-gray-700">최근 검색어: </span>
    ${keywords
      .map(keyword => {
        return `<a class="chip ml-2">${keyword}</a>`;
      })
      .join('')}

    `;
};
