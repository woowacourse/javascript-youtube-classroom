import Component from '../../../core/Component.js';
import { rootStore } from '../../../store/rootStore.js';
import { webStore } from '../../../store/WebStore.js';
import { convertTime } from '../../../utils/customDate.js';

export default class VideoCard extends Component {
  setup() {
    this.state = { watched: this.props.video.watched };
  }

  template() {
    const { videoId, thumbnailUrl, title, channelTitle, publishTime, saved } =
      this.props.video;
    const { watched } = this.state;

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

  handleDelete() {
    if (window.confirm('삭제하시겠습니까?')) {
      const { videoId } = this.props.video;
      const prevSavedVideos = webStore.load();
      const payload = prevSavedVideos.filter(
        video => video.videoId !== videoId
      );
      webStore.save(payload);
      this.target.remove();
    }
  }

  handleWatched() {
    const { videoId } = this.props.video;
    const prevSavedVideos = webStore.load();
    const payload = prevSavedVideos.map(video => {
      if (video.videoId === videoId) {
        video.watched = !video.watched;
      }
      return video;
    });
    webStore.save(payload);
    this.setState({ watched: !this.state.watched });
  }

  handleSave() {
    const { video } = this.props;
    const { videoId } = video;
    const prevSavedVideos = webStore.load();
    const newSavedVideos = [
      ...prevSavedVideos,
      { ...video, saved: true, watched: false },
    ];

    try {
      webStore.save(newSavedVideos);

      const { videos } = rootStore.state;
      const newVideos = [...videos].map(video => {
        if (video.videoId === videoId) {
          return { ...video, saved: true };
        }

        return video;
      });

      rootStore.setState({
        videos: newVideos,
        savedVideos: newSavedVideos,
        hasWatchedVideo: true, // @TODO: 처음에만 true로 바꿔주고, 나중에는 동작하지 않게 하기
      });
    } catch ({ message }) {
      alert(message);
    }
  }
}
