export default class VideoCard {
  constructor(parentElement, props) {
    this.parentElement = parentElement;
    this.props = props;
  }

  template() {
    const { item, videoIds } = this.props;
    try {
      const {
        id: { videoId },
        snippet: {
          thumbnails: {
            medium: { url },
          },
          publishTime,
          channelTitle,
          title,
        },
      } = item;

      const storeButton = videoIds.includes(videoId)
        ? ''
        : '<button class="video-item__save-button button">⬇ 저장</button>';

      const date = new Date(publishTime);
      const dateText = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

      return `
      <li class="video-item" data-video-id="${videoId}">
        <img
          src="${url}"
          alt="video-item-thumbnail" class="video-item__thumbnail" data-video-thumbnail="${url}">
        <h4 class="video-item__title" data-video-title="${title}">${title}</h4>
        <p class="video-item__channel-name" data-video-channel-name="${channelTitle}">${channelTitle}</p>
        <p class="video-item__published-date" data-video-published-date="${dateText}">${dateText}</p>
        ${storeButton}
      </li>
      `;
    } catch (err) {
      console.log('err', err);
      return '';
    }
  }
}
