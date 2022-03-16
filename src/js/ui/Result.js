import { getFoundResultTemplate, notFoundTemplate } from './template';
import { skeletonUI } from './loading';
import { searchVideos } from '../domain/youtubeApi';
import { $ } from '../utils/dom';
import { delay } from '../utils/common';
import { showExceptionSnackBar } from '../utils/snackBar';

export default class Result {
  renderVideoList(json) {
    $('.video-list').insertAdjacentHTML(
      'beforeend',
      json.items.length ? getFoundResultTemplate(json.items) : notFoundTemplate,
    );
    if (json && json.nextPageToken) {
      this.scrollObserver(json.nextPageToken);
    }
  }

  renderInitialVideoList(searchText) {
    searchVideos(searchText)
      .then(json => {
        $('.video-list').replaceChildren();
        this.renderVideoList(json);
      })
      .catch(async ({ message }) => {
        await delay(700);
        showExceptionSnackBar(message);
        skeletonUI.remove();
      });
  }

  renderNextVideoList(nextPageToken) {
    searchVideos($('#search-input-keyword').value, nextPageToken)
      .then(json => {
        skeletonUI.remove();
        this.renderVideoList(json);
      })
      .catch(async ({ message }) => {
        await delay(700);
        showExceptionSnackBar(message);
      });
  }

  scrollObserver(nextPageToken) {
    let $li = $('li:last-child');

    const io = new IntersectionObserver(
      entry => {
        if (entry[0].isIntersecting) {
          io.unobserve($li);
          skeletonUI.render();
          this.renderNextVideoList(nextPageToken);
        }
      },
      {
        threshold: 0.5,
      },
    );

    io.observe($li);
  }

  resetVideoList() {
    $('.video-list').replaceChildren();
  }
}
