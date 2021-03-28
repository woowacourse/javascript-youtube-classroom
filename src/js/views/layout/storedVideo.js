import { YOUTUBE_LINK_ENDPOINT, CLASS_NAME } from '../../constants.js';

export const getSavedVideoTemplate = ({
  videoId,
  videoTitle,
  channelId,
  channelTitle,
  publishedAt,
  isLiked,
  isWatching,
}) => {
  const { WATCHING, WATCHED, CHECKED, LIKED } = CLASS_NAME;

  return `
    <article id=${videoId} class="${isWatching ? WATCHING : WATCHED} ${isLiked ? LIKED : ''} clip">
      <div class="preview-container">
        <iframe
          loading="lazy"
          width="100%"
          height="118"
          src=${YOUTUBE_LINK_ENDPOINT.VIDEO}${videoId}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3 class="video-title">${videoTitle}</h3>
        <div class="channel-title">
          <a href=${
            YOUTUBE_LINK_ENDPOINT.CHANNEL
          }${channelId} target="_blank" rel="noopener" class="channel-link mt-1 ">
          ${channelTitle}
          </a>
        </div>
        <div class="published-at">${publishedAt}</div>
        <div>
          <span class="check-button video-manage-btn ${isWatching ? '' : CHECKED}">✅</span>
          <span class="like-button video-manage-btn  ${isLiked ? CHECKED : ''}">👍</span>
          <span class="comment-button video-manage-btn disabled">💬</span>
          <span class="remove-button video-manage-btn">🗑️</span>
        </div>
      </div>
    </article>
  `;
};
