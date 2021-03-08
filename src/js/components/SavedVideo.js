import { SAVED_VIDEO_SUBSCRIBER_KEY } from '../model/index.js';
import { getVideoTemplate } from '../constants/index.js';
import { getVideoByIdList, $, renderSkeleton } from '../util/index.js';

export class SavedVideo {
  constructor({ savedVideoManager, isChecked }) {
    this.$savedVideoWrapper = $('.js-saved-video-wrapper');

    this.savedVideoManager = savedVideoManager;
    this.savedVideoManager.subscribe({
      key: SAVED_VIDEO_SUBSCRIBER_KEY.SAVE,
      subscriber: this.fetchSavedVideoData.bind(this),
    });

    this.isChecked = isChecked;
    this.savedVideoData = this.fetchSavedVideoData();
  }

  async fetchSavedVideoData() {
    try {
      renderSkeleton(this.$savedVideoWrapper, this.savedVideoManager.getSavedVideos().length);
      const savedVideoData = await getVideoByIdList(this.savedVideoManager.getSavedVideoIdList());
      this.setState({ savedVideoData });
    } catch (e) {
      console.error(e);
    }
  }

  setState({ isChecked, savedVideoData }) {
    this.isChecked = isChecked ?? this.isChecked;
    this.savedVideoData = savedVideoData ?? this.savedVideoData;

    this.render();
  }

  makeTemplate(videoData) {
    return getVideoTemplate({
      videoData,
      buttonTemplate: this.getButtonTemplate(),
    });
  }

  getButtonTemplate() {
    return `
      <ul class="list-style-none p-0 mt-3 mb-6 d-flex">
        <li class="mr-2"><button type="button" class="emoji-btn opacity-hover">✅</button></li>
        <li class="mr-2"><button type="button" class="emoji-btn opacity-hover">👍</button></li>
        <li class="mr-2"><button type="button" class="emoji-btn opacity-hover">💬</button></li>
        <li class="mr-2"><button type="button" class="emoji-btn opacity-hover">🗑️</button></li>
      </ul>
    `;
  }

  render() {
    if (this.savedVideoData.items.length === 0) {
      return;
    }

    const savedVideos = this.savedVideoManager.getSavedVideos();
    const filteredVideoIdList = this.savedVideoManager
      .getSavedVideoIdList()
      .filter(id => savedVideos[id].isChecked === this.isChecked);

    this.$savedVideoWrapper.innerHTML = this.savedVideoData.items
      .filter(item => filteredVideoIdList.includes(item.id))
      .map(item => this.makeTemplate(item))
      .join('');
  }
}
