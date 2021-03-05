import {
  $modal,
  $searchResultVideoWrapper,
  $searchQueries,
} from '../elements.js';
import { STYLE_CLASS } from '../constants.js';
import {
  getVideoListTemplate,
  getSkeletonListTemplate,
  getSelectedVideoListTemplate,
  getSearchQueriesTemplate,
  getSearchQueryTemplate,
} from './templates.js';
import { $ } from '../utils/querySelector.js';

const view = {
  openModal() {
    $modal.classList.add(STYLE_CLASS.OPEN);
  },
  closeModal() {
    $modal.classList.remove(STYLE_CLASS.OPEN);
  },
  insertVideoItems($element, videos) {
    $element.insertAdjacentHTML('beforeend', getVideoListTemplate(videos));
  },
  renderVideoItems($element, videos) {
    $element.innerHTML = getVideoListTemplate(videos);
  },
  insertSelectedVideoItems($element, videos) {
    $element.insertAdjacentHTML(
      'beforeend',
      getSelectedVideoListTemplate(videos)
    );
  },
  renderSelectedVideoItems($element, videos) {
    $element.innerHTML = getSelectedVideoListTemplate(videos);
  },
  renderSkeletonItems() {
    $searchResultVideoWrapper.innerHTML = getSkeletonListTemplate();
  },
  showElementBySelector(selector) {
    $(selector).classList.remove('removed');
  },
  hideElementBySelector(selector) {
    const target = $(selector);
    if (Array.isArray(target)) {
      target.forEach(item => {
        item.classList.add('removed');
      });
      return;
    }
    target.classList.add('removed');
  },
  showElement($element) {
    $element.classList.remove('removed');
  },
  hideElement($element) {
    $element.classList.add('removed');
  },
  insertSearchQueries(queries) {
    $searchQueries.insertAdjacentHTML(
      'beforeend',
      getSearchQueriesTemplate(queries)
    );
  },
  insertSearchQuery(query) {
    $searchQueries.insertAdjacentHTML(
      'beforeend',
      getSearchQueryTemplate(query)
    );
  },
};

export default view;
