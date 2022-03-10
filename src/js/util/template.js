import notFoundImage from '../../assets/images/not_found.jpg';

const videoItemTemplate = ({ videoId, channelTitle, thumbnails, title, publishTime }) => `
  <li class="video-item" data-video-id=${videoId}>
    <img
      src=${thumbnails}
      alt="video-item-thumbnail" class="video-item__thumbnail">
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime}</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>
  `;

export const videoListTemplate = (preprocessedData) => `
  <ul class="video-list">
    ${preprocessedData.map((datum) => videoItemTemplate(datum)).join('')}
  </ul>
  `;

export const NO_RESULT_TEMPLATE = `
  <div class="no-result">
    <img src=${notFoundImage} alt="no result image" class="no-result__image">
  </div>
`;
