class VideoItem {
  constructor(item, isWatched = false) {
    const {
      id: { videoId },
      snippet: { publishedAt, title, thumbnails, channelTitle, channelId },
    } = item;
    this.id = videoId ?? item.id;
    const [year, month, day] = publishedAt.split('T')[0].trim().split('-');
    this.publishedAtAsDateTime = `${year}-${month}-${day}`;
    this.publishedAt = `${year}년 ${month}월 ${day}일`;
    this.title = title;
    this.thumbnailUrl = thumbnails.medium.url;
    this.channelTitle = channelTitle;
    this.channelId = channelId;
    this.isWatched = isWatched;
  }
}

export default VideoItem;
