/* eslint-disable max-lines-per-function */
import { ERROR_MESSAGES } from '../../constants/constants';
import element from '../util/createElement';

export function savedVideoElementButtons(currentTabName) {
  return element({
    tag: 'div',
    className: 'video-item__button-wrapper',
    children: [
      element({
        tag: 'button',
        className: `video-item__watched-button button ${currentTabName === 'watched' && 'checked'}`,
        props: { type: 'button' },
        children: '✅',
      }),
      element({
        tag: 'button',
        className: 'video-item__unsave-button button',
        props: { type: 'button' },
        children: '🗑',
      }),
    ],
  });
}

export function noSavedVideosTemplate() {
  return element({
    tag: 'div',
    className: 'no-saved-videos',
    children: [
      element({ tag: 'p', className: 'no-saved-videos__emoji', children: '(⊙_⊙;))' }),
      element({
        tag: 'p',
        className: 'no-saved-videos__description',
        children: ERROR_MESSAGES.NO_SAVED_VIDEOS,
      }),
    ],
  });
}
