class VideoItem {
  constructor(item) {
    const {
      id: { videoId },
      snippet: { publishedAt, title, thumbnails, channelTitle },
    } = item;
    this.id = videoId;
    this.publishedAt = this.conventPublishedAtFormat(publishedAt);
    this.title = title;
    this.thumbnailUrl = thumbnails.medium.url;
    this.channelTitle = channelTitle;
  }

  conventPublishedAtFormat(publishedAt) {
    const [year, month, day] = publishedAt.split('T')[0].trim().split('-');
    return `${year}년 ${month}월 ${day}일`;
  }
}

export default VideoItem;
