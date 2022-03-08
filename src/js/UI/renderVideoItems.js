import { $, $$ } from '../util/dom.js';

const template = {
  skeletonUI: `<li class="skeleton">
  <div class="image"></div>
  <p class="line"></p>
  <p class="line"></p>
</li>`,
};

export const renderVideoItems = list => {};

export const renderSkeletonUI = () => {
  $('.video-list').insertAdjacentHTML('beforeEnd', template.skeletonUI.repeat(10));
};

export const removeSkeletonUI = () => {
  $$('.skeleton').forEach(element => element.remove());
};
