import element from '../util/createElement';
import '../../../assets/images/not_found.png';

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
