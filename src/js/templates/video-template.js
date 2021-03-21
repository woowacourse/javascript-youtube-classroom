import { CLASS } from '../constants/constant.js';
import { convertDateFormat } from '../utils/util.js';

const savedVideoButtons = info => {
  return `<div class="video-info-buttons" data-url="${info.url}">
            <span class="watched ${
              info.watched ? null : 'opacity-hover'
            }">✅</span>
            <span class="thumbs-up ${
              info.liked ? null : 'opacity-hover'
            }">👍</span>
            <span class="comments opacity-hover">💬</span>
            <span class="delete opacity-hover">🗑️</span>
          </div>
      `;
};

const searchVideoButtons = (info, save) => {
  return `<div class="d-flex justify-end">
            <button class="btn js-save-button ${save ? CLASS.INVISIBLE : ''}" 
              data-url="${info.url}"
              data-title="${info.title}"
              data-channel-id="${info.channelId}"
              data-channel-title="${info.channelTitle}"
              data-publish-time="${info.publishTime}">⬇️ 저장</button>
          </div>`;
};

export const videoTemplate = (info, save = null) => {
  return `<article class="clip skeleton">
            <div class="preview-container image">
              <iframe
              loading="lazy"
              width="100%"
              height="118"
              data-src='https://www.youtube.com/embed/${info.url}'
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              ></iframe>
            </div>
            <div class="content-container pt-2 px-1">
              <h3 class="line">${info.title}</h3>
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
                ${
                  save === null
                    ? savedVideoButtons(info)
                    : searchVideoButtons(info, save)
                }
                </div>
              </div>
            </article>`;
};

export const recentKeywordsTemplate = keywords => {
  return `<span class="text-gray-700">최근 검색어: </span>
          ${keywords
            .map(keyword => {
              return `<a class="chip ml-2">${keyword}</a>`;
            })
            .join('')}`;
};
