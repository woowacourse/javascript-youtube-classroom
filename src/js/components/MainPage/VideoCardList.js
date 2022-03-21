import Component from '../../core/Component.js';
import './VideoCard.js';
import { useStore } from '../../services/VideoService.js';

class VideoCardList extends Component {
  template() {
    const savedVideos = useStore((state) => state.savedVideos);
    const savedVideosFilter = useStore((state) => state.savedVideosFilter);
    const filteredVideos = savedVideos.filter(
      (video) =>
        (!!video.watched && video.watched === savedVideosFilter.watched) ||
        (!video.watched && !video.watched === savedVideosFilter.watching)
    );

    return `
      ${filteredVideos
        .map(
          (video) =>
            `<saved-card
              class="video-card"
              videoId="${video.videoId}"
              thumbnailUrl="${video.thumbnailUrl}"
              title="${video.title}"
              channelTitle="${video.channelTitle}"
              publishTime="${video.publishTime}"
              watched="${video.watched ?? 'false'}"
            >
            </saved-card>`
        )
        .join('')}
    `;
  }
}

customElements.define('saved-list', VideoCardList);

export default VideoCardList;
