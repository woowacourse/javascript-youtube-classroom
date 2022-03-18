import { ERROR_MESSAGES } from '../../constants/constants';

export default function getVideoObjectArray(items, savedVideos) {
  if (items.length === 0) throw new Error(ERROR_MESSAGES.NO_RESULT);
  return items.map((item) => {
    const { snippet, id } = item;
    return {
      videoId: id.videoId || id,
      thumbnail: snippet.thumbnails.medium.url,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      publishedAt: snippet.publishedAt,
      isSaved: savedVideos ? !!savedVideos.includes(id.videoId) : true,
    };
  });
}
