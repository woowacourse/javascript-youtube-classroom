const template = {
  videoItems: ({ id, url, channelTitle, title, publishTime }) => `
  <li class="video-item" data-video-id=${id}>
    <img
      src=${url}
      alt="video-item-thumbnail" class="video-item__thumbnail" />
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime.getFullYear()}년 ${publishTime.getMonth()}월 ${publishTime.getDate()}일</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>
  `,
};
export default template;
