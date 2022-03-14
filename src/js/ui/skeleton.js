import { $, $$ } from '../utils/dom';

export const skeleton = {
  skeletonTemplate() {
    return `
      <div class="skeleton">
        <div class="skeleton__image"></div>
        <p class="skeleton__line"></p>
        <pfs class="skeleton__line"></p>
        <p class="skeleton__line"></p>
      </div>
    `;
  },

  renderSkeletonUI() {
    const $videoList = $('.video-list');
    $videoList.replaceChildren();
    $videoList.insertAdjacentHTML(
      'beforeend',
      this.skeletonTemplate().repeat(10),
    );
  },

  removeSkeletonUI() {
    $$('.skeleton').forEach(skeleton => skeleton.replaceChildren());
  },
};
