// const nextPageToken = 'CAoQAA';
// const query = '우아한테크코스';
// // 마르코 API 서버 주소: https://priceless-euclid-bf53ed.netlify.app
// // 위니 API 서버 주소: https://thirsty-ritchie-0c8419.netlify.app

// try {
//   // const ORIGINAL_HOST = "https://www.googleapis.com"; // 기존 유튜브 API 호스트
//   const REDIRECT_SERVER_HOST = 'https://thirsty-ritchie-0c8419.netlify.app'; // my own redirect server hostname

//   const url = new URL('youtube/v3/search', REDIRECT_SERVER_HOST);
//   const parameters = new URLSearchParams({
//     part: 'snippet',
//     type: 'video',
//     maxResults: 10,
//     regionCode: 'kr',
//     safeSearch: 'strict',
//     pageToken: nextPageToken || '',
//     q: query,
//   });
//   url.search = parameters.toString();

//   const response = await fetch(url, { method: 'GET' });
//   const body = await response.json();

//   if (!response.ok) {
//     throw new Error(body.error.message); //  <-- 이렇게 하시면 디버깅하실때 매우 편합니다.
//   }

//   // write a code below that you want to do here!
//   const bodyMap = body.items.map((item) => item.snippet);
//   console.log(bodyMap);
//   console.log(body);
// } catch (error) {
//   console.error(error);
// }
const dataModel = {
  videoId: '',
  channelId: '',
  title: '',
  description: '',
  thumbnails: {},
  channelTitle: '',
  publishTime: '',
};

export const setItemLocal = (dataModel) => {
  localStorage.setItem('myID', 'hello');
};

setItemLocal(dataModel);

export const getItemLocal = (videoId) => {
  return localStorage.getItem(videoId);
};

export const exportItem = (videoId) => { 
  return getItemLocal(videoId)
} 
