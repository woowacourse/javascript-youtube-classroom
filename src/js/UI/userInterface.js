import { $, $$ } from '../util/querySelector.js';
import storage from '../storage/storage.js';

const template = {
  skeletonUI: `<li class="skeleton">
  <div class="image"></div>
  <p class="line"></p>
  <p class="line"></p>
</li>`,
  videoItem: item => {
    return `
      <li class="video-item" data-video-id='${item.id.videoId}'>
        <img
          src='${item.snippet.thumbnails.high.url}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.snippet.title}</h4>
        <p class="video-item__channel-name">${item.snippet.channelTitle}</p>
        <p class="video-item__published-date">${item.snippet.publishTime}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>
  `;
  },
  savedVideoItem: item => {
    return `
      <li class="video-item" data-video-id='${item.id}'>
        <img
          src='${item.imgSrc}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.title}</h4>
        <p class="video-item__channel-name">${item.channelTitle}</p>
        <p class="video-item__published-date">${item.publishedDate}</p>
        <div class="video-item-buttons">
          <button class="video-item__watched-button button">✅</button>
          <button class="video-item__delete-button button">🗑️</button>
        </div>
      </li>
  `;
  },
  watchedVideoItem: item => {
    return `
      <li class="video-item" data-video-id='${item.id}'>
        <img
          src='${item.imgSrc}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.title}</h4>
        <p class="video-item__channel-name">${item.channelTitle}</p>
        <p class="video-item__published-date">${item.publishedDate}</p>
        <div class="video-item-buttons">
          <button class="video-item__delete-button button">🗑️</button>
        </div>
      </li>
  `;
  },
  notingSavedImage: `        
  <img
  src="./assets/nothing_saved.png"
  alt="nothing saved image"
  class="nothing-saved__image"/>
  `,
};

const userInterface = {
  resetVideoList() {
    $('.video-list').replaceChildren();
  },

  renderSkeletonUI() {
    $('.search-result').classList.remove('search-result--no-result');
    $('.no-result').hidden = true;
    $('.video-list').classList.remove('hide');
    $('.video-list').insertAdjacentHTML('beforeEnd', template.skeletonUI.repeat(10));
  },

  removeSkeletonUI() {
    $$('.skeleton').forEach(element => element.remove());
  },

  removeSavedVideoButton() {
    const savedVideos = storage.getSavedVideos();
    if (savedVideos) {
      savedVideos.forEach(video => {
        if ($('.video-list').lastElementChild.dataset.videoId === video.id) {
          $('.video-list').lastElementChild.lastElementChild.hidden = true;
        }
      });
    }
  },

  renderVideoItems({ items }) {
    this.removeSkeletonUI();
    items.forEach(item => {
      $('.video-list').insertAdjacentHTML('beforeEnd', template.videoItem(item));
      this.removeSavedVideoButton();
    });
  },

  renderNoResult() {
    this.removeSkeletonUI();
    $('.search-result').classList.add('search-result--no-result');
    $('.no-result').hidden = false;
    $('.video-list').classList.add('hide');
  },

  renderSearchResult(response) {
    response
      .then(searchResults => {
        if (searchResults.items.length === 0) {
          this.renderNoResult();
          return;
        }
        this.renderVideoItems(searchResults);
      })
      .catch(error => alert(error.message));
  },

  renderNextSearchResult(response) {
    response.then(searchResults => {
      this.renderVideoItems(searchResults);
    });
  },

  renderSavedVideoItems() {
    const savedVideos = storage.getSavedVideos();
    if (!savedVideos) {
      this.renderNothingSavedImage();
      return;
    }
    $('.nothing-saved').replaceChildren();
    if ($('.saved-video-list').classList.contains('watched')) {
      savedVideos.forEach(savedVideo => {
        if (!savedVideo.watched) {
          $('.saved-video-list').insertAdjacentHTML(
            'beforeEnd',
            template.savedVideoItem(savedVideo),
          );
        }
      });
      return;
    }
    savedVideos.forEach(savedVideo => {
      if (savedVideo.watched) {
        $('.saved-video-list').insertAdjacentHTML(
          'beforeEnd',
          template.watchedVideoItem(savedVideo),
        );
      }
    });
  },

  renderNothingSavedImage() {
    if ($('.nothing-saved').childElementCount === 0) {
      $('.nothing-saved').insertAdjacentHTML('beforeEnd', template.notingSavedImage);
    }
  },
};

export default userInterface;
