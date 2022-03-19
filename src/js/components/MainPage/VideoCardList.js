import Component from '../../core/Component.js';
import VideoCard from './VideoCard.js';
import SkeletonCard from './SkeletonCard.js';
import { useStore } from '../../services/VideoService.js';

export default class VideoCardList extends Component {
  template() {
    const savedVideos = useStore((state) => state.savedVideos);
    const savedVideosFilter = useStore((state) => state.savedVideosFilter);
    const filteredVideos = savedVideos.filter(
      (video) =>
        (!!video.watched && video.watched === savedVideosFilter.watched) ||
        (!video.watched && !video.watched === savedVideosFilter.watching)
    );

    return `
      ${filteredVideos.map(() => '<div class="video-card"></div>').join('')}
    `;
  }

  afterMounted() {
    const savedVideos = useStore((state) => state.savedVideos);
    const savedVideosFilter = useStore((state) => state.savedVideosFilter);
    const filteredVideos = savedVideos.filter(
      (video) =>
        (!!video.watched && video.watched === savedVideosFilter.watched) ||
        (!video.watched && !video.watched === savedVideosFilter.watching)
    );
    const videoCards = this.target.querySelectorAll('.video-card');

    videoCards.forEach((videoCard, index) => {
      new VideoCard(videoCard, { video: filteredVideos[index] });
    });
  }
}
