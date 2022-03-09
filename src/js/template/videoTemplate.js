const videoTemplate = ({ id: { videoId }, thumbnails: { default: src }, title, snippet: { channelTitle, publishTime } }) => `
    <li class="video-item" data-video-id="${videoId}"> 
      <img src="${src.url}" alt="video-item-thumbnail" class="video-item__thumbnail" />
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelTitle}</p>
      <p class="video-item__published-date">${publishTime}</p>
      <button class="video-item__save-button button">⬇ 저장</button>
    </li>`;

export { videoTemplate };

// {
//     etag: '13LgdvBoYOy6x3R7D21_y5pZvts',
//     id: {
//       kind: 'youtube#video',
//       videoId: '6PmRRLrLDwQ',
//     },
//     kind: 'youtube#searchResult',
//     snippet: {
//       channelId: 'UCK8S6QMrTk1G8TYQwIyDo-w',
//       channelTitle: 'LQ KPOP',
//       description: '',
//       liveBroadcastContent: 'none',
//       publishTime: '2022-02-11T05:57:06Z',
//       publishedAt: '2022-02-11T05:57:06Z',
//     },
//     thumbnails: {
//       default: { url: 'https://i.ytimg.com/vi/6PmRRLrLDwQ/default.jpg', width: 120, height: 90 },
//       igh: { url: 'https://i.ytimg.com/vi/6PmRRLrLDwQ/hqdefault.jpg', width: 480, height: 360 },
//       medium: { url: 'https://i.ytimg.com/vi/6PmRRLrLDwQ/mqdefault.jpg', width: 320, height: 180 },
//     },
//     title: 'B T S PLAYLIST 2022 UPDATED | 방탄소년단 노래 모음',
//   }