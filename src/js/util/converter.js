export const convertDataToDateString = (publishTime) => {
  const dateObject = new Date(publishTime);

  return `${dateObject.getFullYear()}년 ${dateObject.getMonth() + 1}월 ${dateObject.getDate()}일`;
};

export const convertDOMToSaveObject = (parentTarget) => {
  return {
    videoId: parentTarget.dataset.videoId,
    videoThumbnail: parentTarget.querySelector('.video-item__thumbnail').src,
    videoChannelTitle: parentTarget.querySelector('.video-item__channel-name').innerText,
    videoTitle: parentTarget.querySelector('.video-item__title').innerText,
    videoDate: parentTarget.querySelector('.video-item__published-date').innerText,
  };
};
