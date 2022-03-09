import Component from '../../core/Component.js';
import VideoCard from './VideoCard.js';

export default class VideoCardList extends Component {
  setup() {
    const { items } = this.props;
    const savedVideos = Component.webStore.load();
    const videos = items.map((item) => {
      return {
        loading: false,
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
        saved: savedVideos.includes(item.id.videoId),
      };
    });

    this.state = { videos, isLoading: false };
  }

  template() {
    const { videos } = this.state;

    return `
      ${videos.map(() => `<div class="video-card"></div>`).join('')}
    `;
  }

  afterMounted() {
    const { videos } = this.state;

    document
      .querySelectorAll('.video-card')
      .forEach(
        (videoCard, index) => new VideoCard(videoCard, { video: videos[index] })
      );
  }

  setEvent() {
    this.addEvent('scroll', '#video-list', async (e) => {
      if (
        this.isScrollBelowLastCard(this.target, e.target) &&
        !this.state.isLoading
      ) {
        // 스크롤이 마지막 요소에 닿으면 로딩 시작

        // 로딩 전 요소들 캐싱
        const prev = this.state.videos;

        // 로딩 될 요소들의 스켈레톤 생성해 state에 추가
        this.setState({
          isLoading: true,
          videos: [
            ...prev,
            ...Array(10).fill({
              loading: true,
              videoId: null,
              thumbnailUrl: null,
              title: null,
              channelTitle: null,
              publishTime: null,
              saved: false,
            }),
          ],
        });
        const newVideos = await this.loadNextVideos();

        // 로딩이 끝난 후 로딩 된 요소들을 원하는 프로퍼티를 가진 객체로 매핑
        const savedVideos = Component.webStore.load();
        const newVideoProps = newVideos.map((item) => {
          return {
            loading: false,
            videoId: item.id.videoId,
            thumbnailUrl: item.snippet.thumbnails.default.url,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            publishTime: item.snippet.publishTime,
            saved: savedVideos.includes(item.id.videoId),
          };
        });

        this.setState({
          isLoading: false,
          videos: [...prev, ...newVideoProps],
        });
      }
    });
  }

  async loadNextVideos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.props.items);
      }, 1000);
    });
  }

  isScrollBelowLastCard(eventTarget) {
    const { scrollHeight, scrollTop, clientHeight } = eventTarget;
    const cardHeight = this.target.lastElementChild?.offsetHeight;

    return scrollHeight - scrollTop - cardHeight <= clientHeight;
  }
}
