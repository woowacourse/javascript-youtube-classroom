const template = {
  skeletonUI: `
  <li class="skeleton">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </li>`,

  videoItem: item => {
    return `
      <li class="video-item" data-video-id='${item.id.videoId}'>
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${item.id.videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h4 class="video-item__title">${item.snippet.title}</h4>
        <p class="video-item__channel-name">${item.snippet.channelTitle}</p>
        <p class="video-item__published-date">${item.snippet.publishTime}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>`;
  },

  nothingFoundImage: `
  <img src="./assets/not_found.png" alt="no result image" class="no-result__image" />
  <p class="no-result__description">
    검색 결과가 없습니다<br />
    다른 키워드로 검색해보세요
  </p>`,
};

export default template;
