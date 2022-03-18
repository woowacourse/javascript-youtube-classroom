const template = {
  savedVideoItem: item => {
    return `
      <li class="video-item" data-video-id='${item.id}'>
        <img
          src='${item.imgSrc}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.title}</h4>
        <p class="video-item__channel-name">${item.channelTitle}</p>
        <p class="video-item__published-date">${item.publishedDate}</p>
        <div class="video-item-buttons">
          <button class="video-item__watched-button button">✅</button>
          <button class="video-item__delete-button button">🗑️</button>
        </div>
      </li>`;
  },

  watchedVideoItem: item => {
    return `
      <li class="video-item" data-video-id='${item.id}'>
        <img
          src='${item.imgSrc}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.title}</h4>
        <p class="video-item__channel-name">${item.channelTitle}</p>
        <p class="video-item__published-date">${item.publishedDate}</p>
        <div class="video-item-buttons">
          <button class="video-item__delete-button button">🗑️</button>
        </div>
      </li>`;
  },

  notingSavedImage: `        
  <img
    src="./assets/nothing_saved.png"
    alt="nothing saved image"
    class="nothing-saved__image"
  />`,
};

export default template;
