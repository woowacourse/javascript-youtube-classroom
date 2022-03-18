import element from '../util/createElement';
import videoElementTemplate from '../shared/VideoElement';
import '../../../assets/images/not_found.png';

export function searchVideoElementTemplate(resultItem) {
  const videoElement = videoElementTemplate(resultItem);
  const button = element({
    tag: 'button',
    className: 'video-item__save-button button',
    props: { disabled: resultItem.isSaved, type: 'button' },
    dataset: { videoId: resultItem.videoId },
    children: '⬇ 저장',
  });
  videoElement.append(button);
  return videoElement;
}

export function errorTemplate(errorMessage) {
  return element({
    tag: 'div',
    className: 'no-result',
    children: [
      element({
        tag: 'img',
        className: 'no-result__image',
        props: { src: './not_found.png', alt: 'no result image' },
      }),
      element({ tag: 'p', className: 'no-result__description', children: errorMessage }),
    ],
  });
}
