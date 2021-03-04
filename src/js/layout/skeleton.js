import { MAX_RESULT_COUNT } from '../constants.js';

const skeletonUnitTemplate = `
  <article class="clip">
    <div class="preview-container image"></div>
    <div class="content-container pt-2 px-1">
      <h3 class="video-title line"></h3>
      <div class="channel-title line mt-1"></div>
      <div class="published-at meta line"></div>
      <div class="d-flex justify-end">
        <button class="save-button btn">⬇️ 저장</button>
      </div>
    </div>
  </article>
`;

export const getSkeletonTemplate = (index) => {
  return `
    <div class="search-result-group skeleton" data-group-index=${index}>
      ${skeletonUnitTemplate.repeat(MAX_RESULT_COUNT)}
    </div>
  `;
};
