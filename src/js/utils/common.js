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
    videoId: item.dataset.videoId,
    publishedAt: item.parentNode.children[3].dataset.publishDate,
    channelId: item.parentNode.children[2].dataset.channelId,
    title: item.parentNode.children[1].firstElementChild.textContent,
    thumbnailURL: item.parentNode.children[0].firstElementChild.src,
    channelTitle: item.parentNode.children[2].firstElementChild.textContent,
    watched: false,
  };
  return data;
};

export { convertToKoreaLocaleDate, delay, isSavedVideo, configureVideoData };
