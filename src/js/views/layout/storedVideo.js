import { YOUTUBE_VIDEO_ENDPOINT, YOUTUBE_CHANNEL_ENDPOINT, WATCHING, CHECKED } from '../../constants.js';

export const getSavedVideoTemplate = ({ videoId, videoTitle, channelId, channelTitle, publishedAt }, className) => {
  return `
    <article id=${videoId} class=${className} clip>
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          src=${YOUTUBE_VIDEO_ENDPOINT}${videoId}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3 class="js-video-title">${videoTitle}</h3>
        <div>
          <a href=${YOUTUBE_CHANNEL_ENDPOINT}${channelId} target="_blank" rel="noopener" class="channel-name mt-1">
          ${channelTitle}
          </a>
          <div class="meta">
            <p>${publishedAt}</p>
          </div>
          <div>
            <span class="js-check-button video-manage-btn ${className === WATCHING ? '' : CHECKED}">✅</span>
            <span class="js-like-button video-manage-btn">👍</span>
            <span class="js-comment-button video-manage-btn disabled">💬</span>
            <span class="js-remove-button video-manage-btn">🗑️</span>
          </div>
        </div>
      </div>
    </article>
  `;
};
