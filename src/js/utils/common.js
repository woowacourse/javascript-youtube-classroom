import { VIDEO_TYPE } from './constants';

export const $ = selector => document.querySelector(selector);

export const transformDate = dateString => {
  const [year, month, date] = dateString.slice(0, 10).split('-');
  return `${year}년 ${month}월 ${date}일`;
};

export const throttle = (callback, delayTime = 1000) => {
  let throttleTimer = null;
  return function (...parameters) {
    if (!throttleTimer) {
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
        callback(...parameters);
      }, delayTime);
    }
  };
};

export const preprocessVideoInfo = videos => {
  return videos.map(video => {
    return {
      videoId: video.videoId,
      publishedAt: transformDate(video.publishedAt),
      title: video.title,
      url: video.url,
      channelTitle: video.channelTitle,
      type: VIDEO_TYPE.WATCH_LATER,
    };
  });
};
