export default class StorageEngine {
  getData() {
    return JSON.parse(localStorage.getItem('myVideos'));
  }

  saveData(data) {
    const preprocessedData = data.map((datum) => {
      const { videoId } = datum.id;

      return { id: videoId, isSaved: false };
    });

    localStorage.setItem('myVideos', JSON.stringify(preprocessedData));
  }

  clearData() {
    localStorage.removeItem('myVideos');
  }
}

/**
 * {id - channelId(저장용), subscribed : false}
 * snippet - thumbnails
 * snippet - title
 * snippet - channelTitle
 * snippet - publishTime
 */

// "items": [
//   {
//     "kind": "youtube#searchResult",
//     "etag": "BTzbR6-ABuyB6q5Z_A4r68t4wQY",
//     "id": {
//       "kind": "youtube#channel",
//       "channelId": "UC0sYBhZFPXzVL1O3BCGBkRw"
//     },
//     "snippet": {
//       "publishedAt": "2018-05-17T16:00:00Z",
//       "channelId": "UC0sYBhZFPXzVL1O3BCGBkRw",
//       "title": "지피 TV",
//       "description": "오감만족 꿀잼넘치는 종합게임채널 지피TV 더 좋은 방송과 영상으로 보답드리겠습니다. 구독과 좋아요 부탁해요 ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://yt3.ggpht.com/yKWvN74JYKxeEeybx9VD0sqY2z_bIoZ1TGc2L1fFq9G255zhguvHlcHXNErYz_DNwUAzUEvHBA=s88-c-k-c0xffffffff-no-rj-mo"
//         },
//         "medium": {
//           "url": "https://yt3.ggpht.com/yKWvN74JYKxeEeybx9VD0sqY2z_bIoZ1TGc2L1fFq9G255zhguvHlcHXNErYz_DNwUAzUEvHBA=s240-c-k-c0xffffffff-no-rj-mo"
//         },
//         "high": {
//           "url": "https://yt3.ggpht.com/yKWvN74JYKxeEeybx9VD0sqY2z_bIoZ1TGc2L1fFq9G255zhguvHlcHXNErYz_DNwUAzUEvHBA=s800-c-k-c0xffffffff-no-rj-mo"
//         }
//       },
//       "channelTitle": "지피 TV",
//       "liveBroadcastContent": "none",
//       "publishTime": "2018-05-17T16:00:00Z"
//     }
//   },
