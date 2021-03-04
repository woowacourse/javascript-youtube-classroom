import { $ } from '../utils.js';
import { SELECTORS } from '../constants.js';
import Observer from '../lib/Observer.js';

export default class WatchList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.selector = SELECTORS.CLASS.WATCH_LIST;
  }

  getTemplate() {
    const { watchList } = this.store.get();

    // TODO: Youtube API를 통해, ID로 fetch한 데이터를 가져와 template을 생성한다.
    return watchList.map((item) => {
      const { channelId, title, channelTitle, publishedAt } = item.snippet;
      const { videoId } = item.id;

      return `
        <article class="clip d-flex flex-col">
          <div class="preview-container">
            <iframe
              width="100%"
              height="118"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <div class="content-container pt-2 px-1 d-flex flex-col justify-between flex-1">
            <div>
              <h3 class="video-title">${title}</h3>
              <a
                href="https://www.youtube.com/channel/${channelId}"
                target="_blank"
                class="channel-name mt-1"
              >
                ${channelTitle}
              </a>
              <div class="meta">
                <p>${publishedAt}</p>
              </div>
              <div>
                <span class="opacity-hover">✅</span>
                <span class="opacity-hover">👍</span>
                <span class="opacity-hover">💬</span>
                <span class="opacity-hover">🗑️</span>
              </div>
            </div>
          </div>
        </article>
      `;
    });
  }

  render() {
    $(this.selector).innerHTML = this.getTemplate();
  }
}
