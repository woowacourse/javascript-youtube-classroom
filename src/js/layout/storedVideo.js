import { YOUTUBE_VIDEO_ENDPOINT, YOUTUBE_CHANNEL_ENDPOINT } from '../constants.js';

export const getSavedVideoTemplate = ({ videoId, videoTitle, channelId, channelTitle, publishedAt }) => {
  return `
    <article class="watching" class="clip">
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
          <a href=${YOUTUBE_CHANNEL_ENDPOINT}${channelId} target="_blank" class="channel-name mt-1">
          ${channelTitle}
          </a>
          <div class="meta">
            <p>${publishedAt}</p>
          </div>
          <div>
            <span class="js-check-button opacity-hover">✅</span>
            <span class="js-like-button opacity-hover">👍</span>
            <span class="js-comment-button opacity-hover">💬</span>
            <span class="js-remove-button opacity-hover">🗑️</span>
          </div>
        </div>
      </div>
    </article>
  `;
};
