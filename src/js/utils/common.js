const convertToKoreaLocaleDate = date => {
  return new Date(date).toLocaleString('ko-KR');
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const isSavedVideo = (saveVideos, videoId) => {
  const filteredVideo = saveVideos.filter(video => video.videoId === videoId);
  return filteredVideo.length > 0;
};

const configureVideoData = item => {
  const data = {
    videoId: item.id,
    publishedAt: item.snippet.publishedAt,
    channelId: item.snippet.channelId,
    title: item.snippet.title,
    thumbnailURL: item.snippet.thumbnails.high.url,
    channelTitle: item.snippet.channelTitle,
    watched: false,
  };
  return data;
};

export { convertToKoreaLocaleDate, delay, isSavedVideo, configureVideoData };
