import Component from '../../../core/Component.js';
import { rootStore } from '../../../store/rootStore.js';
import { convertTime } from '../../../utils/customDate.js';
import { savedVideosStorage } from '../../../localStorage/savedVideos';

export default class VideoCard extends Component {
  template() {
    const { videoId, thumbnailUrl, title, channelTitle, publishTime, saved } =
      this.props.video;

    const watched = this.props.video.watched;

    return `
      <li class="video-item" data-video-id="${videoId}">
        <img
          src="${thumbnailUrl}"
          alt="video-item-thumbnail" class="video-item__thumbnail"
          loading="lazy"
        >
        <h4 class="video-item__title line">${title}</h4>
        <p class="video-item__channel-name line">${channelTitle}</p>
        <p class="video-item__published-date line">${convertTime(
          publishTime
        )}</p>
        ${
          watched !== undefined
            ? `<div class="video-item__buttons">
                <button class="video-item__watched-button ${
                  watched ? 'watched' : ''
                }" >✅</button>
                <button class="video-item__delete-button">🗑</button>
              </div>`
            : saved
            ? ''
            : '<button class="video-item__save-button button">⬇ 저장</button>'
        }
      </li>
    `;
  }

  setEvent() {
    this.addEvent(
      'click',
      '.video-item__save-button',
      this.handleSave.bind(this)
    );
    this.addEvent(
      'click',
      '.video-item__watched-button',
      this.handleWatched.bind(this)
    );
    this.addEvent(
      'click',
      '.video-item__delete-button',
      this.handleDelete.bind(this)
    );
  }

  handleSave() {
    const { video } = this.props;

    try {
      savedVideosStorage.saveVideo(video);
      this.changeSaved(video.videoId);
    } catch ({ message }) {
      alert(message);
    }
  }

  handleWatched() {
    savedVideosStorage.changeWatchedInLocalStorage(this.props.video.videoId);
    this.target.remove();

    rootStore.setState({
      hasWatchedVideo: savedVideosStorage.hasWatchedVideo(),
      hasWatchingVideo: savedVideosStorage.hasWatchingVideo(),
    });
  }

  handleDelete() {
    if (window.confirm('삭제하시겠습니까?')) {
      savedVideosStorage.deleteVideoInLocalStorage(this.props.video.videoId);
      this.target.remove();

      rootStore.setState({
        hasWatchedVideo: savedVideosStorage.hasWatchedVideo(),
        hasWatchingVideo: savedVideosStorage.hasWatchingVideo(),
      });
    }
  }

  changeSaved(videoId) {
    const { videos } = rootStore.state;
    const newVideos = [...videos].map(video => {
      if (video.videoId === videoId) {
        return { ...video, saved: true };
      }

      return video;
    });

    rootStore.setState({
      videos: newVideos, // 저장 버튼이 사라지도록 하기
      savedVideos: savedVideosStorage.load(), // 저장된 영상이 바로 MainPage에 반영되게 하기
      hasWatchingVideo: true, // @TODO: 처음에만 true로 바꿔주고, 나중에는 동작하지 않게 하기
    });
  }
}
