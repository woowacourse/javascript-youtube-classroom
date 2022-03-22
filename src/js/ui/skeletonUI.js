import { $, $$ } from '../utils/dom';

export const skeletonUI = {
  $videoList: $('.video-list'),

  template() {
    return `
      <div class="skeleton">
        <div class="skeleton__image"></div>
        <p class="skeleton__line"></p>
        <pfs class="skeleton__line"></p>
        <p class="skeleton__line"></p>
      </div>
    `;
  },

  render() {
    this.$videoList.insertAdjacentHTML('beforeend', this.template().repeat(10));
  },

  remove() {
    $$('.skeleton').forEach(skeleton => skeleton.remove());
  },
};
