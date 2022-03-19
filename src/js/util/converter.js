export const convertDataToDateString = (publishTime) => {
  const dateObject = new Date(publishTime);

  return `${dateObject.getFullYear()}년 ${dateObject.getMonth() + 1}월 ${dateObject.getDate()}일`;
};

export const convertDOMToSaveObject = (parentTarget) => {
  return {
    videoId: parentTarget.dataset.videoId,
    videoThumbnail: parentTarget.children[0].src,
    videoChannelTitle: parentTarget.children[1].innerText,
    videoTitle: parentTarget.children[2].innerText,
    videoDate: parentTarget.children[3].innerText,
  };
};
