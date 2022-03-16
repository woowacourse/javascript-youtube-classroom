import Component from '../../../core/Component.js';
import { rootStore } from '../../../store/rootStore.js';
import { webStore } from '../../../store/WebStore.js';
import { convertTime } from '../../../utils/customDate.js';

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
    const { video } = this.props;
    const { videoId } = video;

    this.addEvent('click', '.video-item__save-button', () => {
      try {
        const prevSavedVideos = webStore.load();
        webStore.save([
          ...prevSavedVideos,
          { ...video, saved: true, watched: false },
        ]);

        const { videos } = rootStore.state;
        const newVideos = [...videos].map(video => {
          if (video.videoId === videoId) {
            return { ...video, saved: true };
          }

          return video;
        });

        rootStore.setState({ videos: newVideos });
      } catch ({ message }) {
        alert(message);
      }
    });
  }
}
