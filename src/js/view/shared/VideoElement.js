/* eslint-disable max-lines-per-function */

import element from '../util/createElement';
import { formatDateString } from '../util/util';

export default function videoElementTemplate({ thumbnail, title, channelTitle, publishedAt }) {
  return element({
    tag: 'li',
    className: 'video-item',
    children: [
      element({
        tag: 'img',
        className: 'video-item__thumbnail',
        props: { src: thumbnail, alt: 'video-item-thumbnail' },
      }),
      element({
        tag: 'h4',
        className: 'video-item__title',
        children: title,
      }),
      element({ tag: 'p', className: 'video-item__channel-name', children: channelTitle }),
      element({
        tag: 'p',
        className: 'video-item__published-date',
        children: formatDateString(publishedAt),
      }),
    ],
  });
}
