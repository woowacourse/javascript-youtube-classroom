import SavedVideoListView from './SavedVideoListView.js';
import { $ } from '../utils/index.js';
import { SELECTOR } from '../constants/index.js';
import { _ } from '../utils/fx.js';

export default class UnseenVideoListView extends SavedVideoListView {
  constructor() {
    super($(SELECTOR.UNSEEN_EMPTY_SCREEN), $(SELECTOR.UNSEEN_VIDEOS));
  }

  renderScreenByVideos(videos) {
    if (videos.length > 0) {
      this.#render(videos);
      this.videoScreen();
    } else {
      this.emptyScreen();
    }
  }

  #render(videos) {
    _.go(
      videos,
      _.map(
        (video) => `<li class="video-item">
          <img src="${video.thumbnail}" alt="video-item-thumbnail" class="video-item__thumbnail">
          <h4 class="video-item__title">${video.title}</h4>
          <p class="video-item__channel-name">${video.channeltitle}</p>
          <p class="video-item__published-date">${video.date}</p>
          <div class="video-item__button-wrap">
            <button class="video-item__check-button button" data-id="${video.id}">✅</button>
            <button class="video-item__delete-button button" data-id="${video.id}">🗑️</button>
          </div>
        </li>`,
      ),
      _.join(''),
      this.renderHTML.bind(this),
    );
  }
}
