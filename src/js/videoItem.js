class VideoItem {
  constructor(item) {
    const {
      id: { videoId },
      snippet: { publishedAt, title, thumbnails, channelTitle },
    } = item;
    this.id = videoId;
    const [year, month, day] = publishedAt.split('T')[0].trim().split('-');
    this.publishedAt = `${year}년 ${month}월 ${day}일`;
    this.title = title;
    this.thumbnailUrl = thumbnails.medium.url;
    this.channelTitle = channelTitle;
  }
}

export default VideoItem;
