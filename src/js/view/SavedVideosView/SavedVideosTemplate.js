/* eslint-disable max-lines-per-function */
import element from '../../util/createElement';
import videoElementTemplate from '../VideoElement';

function savedVideoElementButtons(resultItem, currentTabName) {
  return element({
    tag: 'div',
    className: 'video-item__button-wrapper',
    children: [
      element({
        tag: 'button',
        className: `video-item__watched-button button ${currentTabName === 'watched' && 'checked'}`,
        dataset: { videoId: resultItem.videoId },
        props: { type: 'button' },
        children: '✅',
      }),
      element({
        tag: 'button',
        className: 'video-item__unsave-button button',
        dataset: { videoId: resultItem.videoId },
        props: { type: 'button' },
        children: '🗑',
      }),
    ],
  });
}

export function savedVideoElementTemplate(resultItem, currentTabName) {
  const videoElement = videoElementTemplate(resultItem);
  videoElement.dataset.videoId = resultItem.videoId;

  const buttonDiv = savedVideoElementButtons(resultItem, currentTabName);
  videoElement.append(buttonDiv);
  return videoElement;
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
        children: '저장된 영상이 없습니다!',
      }),
    ],
  });
}
