export default class VideoCard {
  constructor(parentElement, props) {
    this.parentElement = parentElement;
    this.props = props;
  }

  template() {
    const {
      videoItem: {
        videoId,
        thumbnailURL,
        title,
        channelTitle,
        publishedDate
      },
      videoIds } = this.props;

    const storeButton = videoIds.includes(videoId)
      ? ''
      : '<button class="video-item__save-button button">⬇ 저장</button>';

    return `
      <li class="video-item" data-video-id="${videoId}">
        <img
          src="${thumbnailURL}"
          alt="video-item-thumbnail" class="video-item__thumbnail" data-video-thumbnail="${thumbnailURL}">
        <h4 class="video-item__title" data-video-title="${title}">${title}</h4>
        <p class="video-item__channel-name" data-video-channel-name="${channelTitle}">${channelTitle}</p>
        <p class="video-item__published-date" data-video-published-date="${publishedDate}">${publishedDate}</p>
        ${storeButton}
      </li>
      `;
  }
}
