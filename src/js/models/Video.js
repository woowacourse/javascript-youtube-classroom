export default class Video {
  constructor(videoId, videoData) {
    const { title, channelId, channelTitle, publishedAt } = videoData;

    this.id = videoId;
    this.title = title;
    this.channelId = channelId;
    this.channelTitle = channelTitle;
    this.publishedAt = publishedAt;
  }
}
