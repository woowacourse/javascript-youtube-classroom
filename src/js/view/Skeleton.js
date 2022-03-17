import element from '../util/createElement';
import { removeElementList } from '../util/util';

function skeletonTemplate() {
  return element({
    tag: 'div',
    className: 'skeleton',
    children: [
      element({ tag: 'div', className: 'image' }),
      element({ tag: 'p', className: 'line' }),
      element({ tag: 'p', className: 'line' }),
    ],
  });
}

export default function getSkeletonTemplateArray(amount) {
  return Array.from({ length: amount }, () => skeletonTemplate());
}

export function removeAllSkeletons(target) {
  const skeletonList = target.querySelectorAll('.skeleton');
  removeElementList(skeletonList);
}
