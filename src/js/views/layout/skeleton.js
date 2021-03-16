import { YOUTUBE_API } from '../../constants.js';

const skeletonUnitTemplate = `
  <article class="clip">
    <div class="js-preview-container preview-container image"></div>
    <div class="content-container pt-2 px-1">
      <h3 class="js-video-title video-title line"></h3>
      <div class="js-channel-title channel-title line mt-1"></div>
      <div class="js-published-at published-at line"></div>
      <div class="d-flex justify-end">
        <button type="button" class="js-save-button save-button btn">⬇️ 저장</button>
      </div>
    </div>
  </article>
`;

export const getSkeletonTemplate = () => {
  return `
    <div class="js-search-result-group search-result-group skeleton">
      ${skeletonUnitTemplate.repeat(YOUTUBE_API.MAX_RESULT_COUNT)}
    </div>
  `;
};
