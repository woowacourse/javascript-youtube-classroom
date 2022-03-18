import { skeletonUI } from './loading';
import { searchVideos } from '../domain/youtubeApi';
import { $ } from '../utils/dom';
import { delay } from '../utils/common';
import { showExceptionSnackBar } from '../utils/snackBar';
import { getFoundResultTemplate, notFoundTemplate } from './template';

export default class SearchResult {
  constructor() {
    this.$searchResult = $('.search-result');
  }

  #renderVideoList(json) {
    if (!json.items.length) {
      this.$searchResult.insertAdjacentHTML('beforeend', notFoundTemplate);
      return;
    }
    $('.video-list').insertAdjacentHTML(
      'beforeend',
      getFoundResultTemplate(json.items),
    );
    if (json && json.nextPageToken) {
      this.#scrollObserver(json.nextPageToken);
    }
  }

  renderInitialVideoList(searchText) {
    searchVideos(searchText)
      .then(json => {
        $('.video-list').replaceChildren();
        this.#renderVideoList(json);
      })
      .catch(async ({ message }) => {
        await delay(700);
        showExceptionSnackBar(message);
        skeletonUI.remove();
      });
  }

  #renderNextVideoList(nextPageToken) {
    searchVideos($('#search-input-keyword').value, nextPageToken)
      .then(json => {
        skeletonUI.remove();
        this.#renderVideoList(json);
      })
      .catch(async ({ message }) => {
        await delay(700);
        showExceptionSnackBar(message);
      });
  }

  #scrollObserver(nextPageToken) {
    let $li = $('.video-item:last-child');

    const io = new IntersectionObserver(
      entry => {
        if (entry[0].isIntersecting) {
          io.unobserve($li);
          skeletonUI.render();
          this.#renderNextVideoList(nextPageToken);
        }
      },
      {
        threshold: 0.5,
      },
    );

    io.observe($li);
  }

  resetVideoList() {
    this.$searchResult.replaceChildren();
  }
}
