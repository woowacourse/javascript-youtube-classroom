import { formatDateTime } from '../util/index.js';

const searchKind = 'youtube#searchResult';

export const getVideoTemplate = ({ videoData, buttonTemplate }) => {
  const { kind, id, snippet } = videoData;

  return `
      <article class="js-clip-article clip d-flex flex-col justify-between">
        <div class="content-container">
          <div class="preview-container">
            <iframe
              class="lazy"
              width="100%"
              height="118"
              data-src="https://www.youtube.com/embed/${kind === searchKind ? id.videoId : id}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="snippset-container px-1 py-2">
            <h3>${snippet.title}</h3>
            <div>
              <a
                href="https://www.youtube.com/channel/${snippet.channelId}"
                target="_blank"
                rel="noopener noreferer"
                class="channel-name mt-1"
              >
              ${snippet.channelTitle}
              </a>
              <div class="meta">
                <p>${formatDateTime(snippet.publishedAt)}</p>
              </div>
            </div>
          </div>
        </div>
        ${buttonTemplate}
      </article>
    `;
};
