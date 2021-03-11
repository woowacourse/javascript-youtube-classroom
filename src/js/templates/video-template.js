import { convertDateFormat } from '../utils/util.js';

// TODO: 템플릿 중복 - 빼야함
export const savedVideoTemplate = info => {
  return `<article class="clip skeleton">
            <div class="preview-container image">
              <iframe
                width="100%"
                height="118"
                src="https://www.youtube.com/embed/${info.url}"
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
                  class="channel-name mt-1 line"
                >
                ${info.channelTitle}
                </a>
                <div class="meta">
                  <p class="line">${convertDateFormat(info.publishTime)}</p>
                </div>
                <div class="video-info-buttons" data-url="${info.url}">
                  <span class="watched ${
                    info.watched ? null : 'opacity-hover'
                  }">✅</span>
                  <span class="thumbs-up opacity-hover">👍</span>
                  <span class="comments opacity-hover">💬</span>
                  <span class="delete opacity-hover">🗑️</span>
                </div>
              </div>
            </div>
          </article>`;
};
