import { checkSavedVideo } from '../util/validator.js';
import Video from './Video.js';
export default class VideoFactory {
  static generate(item) {
    const { videoId } = item.id;
    const isSaved = checkSavedVideo(videoId);
    const {
      thumbnails: {
        high: { url },
      },
      channelTitle,
      title,
      publishTime,
    } = item.snippet;

    return new Video.Builder()
      .setId(videoId)
      .setThumbnails(url)
      .setTitle(title)
      .setChannelTitle(channelTitle)
      .setPublishTime(publishTime)
      .setIsSaved(isSaved)
      .build();
  }
}
