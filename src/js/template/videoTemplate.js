import notFoundImage from '../../assets/images/not_found.png';

const parseTime = (time) => {
  const date = new Date(time);
  const year = date.getUTCFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

const videoTemplate = (
  {
    id: { videoId },
    snippet: {
      title,
      channelTitle,
      publishTime,
      thumbnails: { high: { url } },
    },
  },
  isSaved
) => `
  <li class="video-item" data-video-id="${videoId}"> 
    <img src="${url}" loading="lazy" alt="video-item-thumbnail" class="video-item__thumbnail" ></img>
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${parseTime(publishTime)}</p>
    ${isSaved ? '<button type="button" class="video-item__save-button button" disabled >저장됨</button>' : '<button type="button" class="video-item__save-button button">⬇ 저장</button>'}
  </li>
`;

const watchVideoTemplate = (
  {
    id,
    snippet: {
      title,
      channelTitle,
      publishedAt,
    },
  },
  divisionSection
) => `
  <li class="video-item" data-video-id="${id}"> 
    <iframe src="https://www.youtube.com/embed/${id}" loading="lazy" title="video-item-thumbnail" class="video-item__thumbnail" ></iframe>
    <h1 class="video-item__title">${title}</h1>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${parseTime(publishedAt)}</p>
    <button class="delete-video-button">🗑️</button>
    ${divisionSection === 'watched' ? '<button class="watched-video-button button-click">✅</button>' : '<button class="watched-video-button">✅</button>'}
  </li>
`;

const videoNoMoreTemplate = '<p class="video-no-more">결과가 더 이상 없습니다</p>';

export {
  videoTemplate,
  videoNoMoreTemplate,
  watchVideoTemplate,
};
