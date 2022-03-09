export const findVideoInVideoList = (videoList, targetVideoId) =>
  videoList.find((video) => {
    const { videoId } = video.getVideoInfo();

    return videoId === targetVideoId;
  });
export const findVideoInVideoInfoList = (videoInfoList, targetVideoId) =>
  videoInfoList.find(({ videoId }) => videoId === targetVideoId);

export const parserVideos = (data) => {
  const { nextPageToken } = data;
  const { items } = data;

  return {
    nextPageToken,
    items: items.map((item) => ({
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails['default'].url,
      publishTime: item.snippet.publishTime,
      channelTitle: item.snippet.channelTitle,
      videoTitle: item.snippet.title,
    })),
  };
};
