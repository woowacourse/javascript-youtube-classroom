import { getFoundResultTemplate, notFoundTemplate } from './template';
import { skeletonUI } from './loading';
import { store } from '../domain/store';
import { request } from '../domain/youtubeApi';
import { MESSAGE, STORAGE_KEY } from '../constants';
import { $, $$ } from '../utils/dom';
import { delay } from '../utils/common';
import { showExceptionSnackBar } from '../utils/snackBar';

export default class Result {
  renderVideoList(json) {
    $('.video-list').insertAdjacentHTML(
      'beforeend',
      json.items.length ? getFoundResultTemplate(json.items) : notFoundTemplate,
    );
    this.addSaveButtonClickEvent(json.items.length);
    if (json && json.nextPageToken) {
      this.scrollObserver(json.nextPageToken);
    }
  }

  renderInitialVideoList(searchText) {
    request(searchText)
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
    request($('#search-input-keyword').value, nextPageToken)
      .then(json => {
        skeletonUI.remove();
        this.renderVideoList(json);
      })
      .catch(async ({ message }) => {
        await delay(700);
        showExceptionSnackBar(message);
      });
  }

  addSaveButtonClickEvent(length) {
    const saveButtons = $$('.video-item__save-button');
    [...saveButtons].slice(-length).forEach(saveButton => {
      saveButton.addEventListener('click', this.handleSaveVideo);
    });
  }

  handleSaveVideo(e) {
    const videoId = e.target.closest('li').dataset.videoId;
    try {
      store.setLocalStorage(STORAGE_KEY, videoId);
      showExceptionSnackBar(MESSAGE.SAVE_COMPLETE);
      e.target.setAttribute('hidden', true);
    } catch ({ message }) {
      showExceptionSnackBar(message);
    }
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
