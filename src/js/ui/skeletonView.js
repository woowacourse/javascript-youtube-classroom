import { REQUEST_VIDEO_QUANTITY } from '../constant/index';
import template from './templates';
import { $$ } from '../util/selector';

class SkeletonView {
  constructor(target) {
    this.$target = target;
  }

  renderSkeletonImage() {
    this.$target.insertAdjacentHTML(
      'beforeend',
      Array(REQUEST_VIDEO_QUANTITY)
        .fill()
        .map((_) => template.skeletonItem())
        .join(' '),
    );
  }

  removeSkeletonImage() {
    $$('.skeleton-container').forEach((element) => {
      element.remove();
    });
  }
}

export default SkeletonView;
