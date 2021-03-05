import { getVideoByIdList, formatDateTime, $, renderSkeleton } from '../util/index.js';

export class SavedVideo {
  constructor({ savedVideoManager, isCompleted }) {
    this.$savedVideoWrapper = $('.js-saved-video-wrapper');

    this.savedVideoManager = savedVideoManager;
    this.savedVideoManager.subscribe(this.fetchSavedVideoData.bind(this));

    this.isCompleted = isCompleted;
    this.savedVideoData = this.fetchSavedVideoData();
  }

  async fetchSavedVideoData() {
    try {
      renderSkeleton(this.$savedVideoWrapper, this.savedVideoManager.getSavedVideos().length);
      const savedVideoData = await getVideoByIdList(this.savedVideoManager.getSavedVideoIdList());
      this.setState({ savedVideoData });
    } catch (e) {
      console.error(e);
      // TODO: 오류났음 보여주는 메세지 띄우기
    }
  }

  setState({ isCompleted, savedVideoData }) {
    this.isCompleted = isCompleted ?? this.isCompleted;
    this.savedVideoData = savedVideoData ?? this.savedVideoData;

    this.render();
  }

  makeTemplate({ id, snippet }) {
    return `
      <article class="clip">
        <div class="preview-container">
          <iframe
            width="100%"
            height="118"
            src="https://www.youtube.com/embed/${id}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="content-container pt-2 px-1">
          <h3>${snippet.title}</h3>
          <div>
            <a
              href="https://www.youtube.com/channel/${snippet.channelId}"
              target="_blank"
              class="channel-name mt-1"
            >
            ${snippet.channelTitle}
            </a>
            <div class="meta">
              <p>${formatDateTime(snippet.publishedAt)}</p>
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
    if (this.savedVideoData.items.length === 0) {
      return;
    }

    const filteredVideoIdList = this.savedVideoManager
      .getSavedVideos()
      .filter(video => video.isCompleted === this.isCompleted)
      .map(video => video.id);

    this.$savedVideoWrapper.innerHTML = this.savedVideoData.items
      .filter(video => filteredVideoIdList.includes(video.id))
      .map(video => this.makeTemplate(video))
      .join('');
  }
}
