import { YOUTUBE_LINK_ENDPOINT } from '../../constants.js';

export const getThumbnailTemplate = (videoId) => {
  return `
    <iframe
      width="100%"
      height="118"
      src=${YOUTUBE_LINK_ENDPOINT.VIDEO}${videoId}
      frameborder="0"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;
};

export const getChannelTitleTemplate = (channelId, channelTitle) => {
  return `
    <a
      href=${YOUTUBE_LINK_ENDPOINT.CHANNEL}${channelId}
      target="_blank"
      rel="noopener"
      class="channel-link">
        ${channelTitle}
    </a>
  `;
};

export const resultNotFoundTemplate = `
  <p align="center">
    <img src="src/images/status/not_found.png" alt="not found" loading="eager" />
  </p>
`;
