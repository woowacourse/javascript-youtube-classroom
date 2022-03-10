const template = {
  videoListItem: ({ id, thumbnail, title, channelName, publishedDate, saved }) =>
    `<li class="video-item" data-video-id="${id}">
      <img src=${thumbnail} alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelName}</p>
      <p class="video-item__published-date">${publishedDate}</p>
      ${saved ? '' : '<button class="video-item__save-button button">⬇ 저장</button>'}
      </li>
    `,
  skeletonListItem: () =>
    `<li class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </li>`.repeat(10),
};

export default template;
