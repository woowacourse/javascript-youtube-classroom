import { skeletonTemplate } from './template';
import { GET_VIDEO_UNIT } from '../constants';
import { $, $$ } from '../utils/dom';

const skeletonUI = {
  render() {
    $('.video-list').insertAdjacentHTML(
      'beforeend',
      skeletonTemplate.repeat(GET_VIDEO_UNIT),
    );
  },
  remove() {
    $$('.skeleton').forEach(skeleton => $('.video-list').removeChild(skeleton));
  },
};

export { skeletonUI };
