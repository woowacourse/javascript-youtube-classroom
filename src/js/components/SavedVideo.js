import { $ } from '../util/index.js';

export class SavedVideo {
  constructor({ savedVideoManager, isCompleted }) {
    this.$savedVideoWrapper = $('.js-saved-video-wrapper');

    this.savedVideoManager = savedVideoManager;
    this.savedVideoManager.subscribe(this.render.bind(this));

    this.isCompleted = isCompleted;

    this.render();
  }

  setState({ isCompleted }) {
    this.isCompleted = isCompleted;
    this.render();
  }

  makeTemplate({ videoId, title, channelId, channelTitle, publishDate }) {
    return `
      <article class="clip">
        <div class="preview-container">
          <iframe
            width="100%"
            height="118"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="content-container pt-2 px-1">
          <h3>${title}</h3>
          <div>
            <a
              href="https://www.youtube.com/channel/${channelId}"
              target="_blank"
              class="channel-name mt-1"
            >
            ${channelTitle}
            </a>
            <div class="meta">
              <p>${publishDate}</p>
            </div>
            <ul class="list-style-none p-0 d-flex">
              <li class="mr-2"><button class="emoji-btn opacity-hover">✅</button></li>
              <li class="mr-2"><button class="emoji-btn opacity-hover">👍</button></li>
              <li class="mr-2"><button class="emoji-btn opacity-hover">💬</button></li>
              <li class="mr-2"><button class="emoji-btn opacity-hover">🗑️</button></li>
            </ul>
          </div>
        </div>
      </article>
    `;
  }

  render() {
    this.$savedVideoWrapper.innerHTML = this.savedVideoManager
      .getSavedVideos()
      .filter(video => video.isCompleted === this.isCompleted)
      .map(video => this.makeTemplate(video))
      .join('');
  }
}
