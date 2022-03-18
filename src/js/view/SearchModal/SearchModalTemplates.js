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

export function errorTemplate(errorImage, errorMessage) {
  return element({
    tag: 'div',
    className: 'no-result',
    children: [
      errorImage,
      element({ tag: 'p', className: 'no-result__description', children: errorMessage }),
    ],
  });
}

export function errorImageTemplate() {
  return element({
    tag: 'img',
    className: 'no-result__image',
    props: { src: './not_found.png', alt: 'no result image' },
  });
}
