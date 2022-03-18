export class VideoItem {
  constructor(item) {
    const {
      id,
      snippet: { publishedAt, title, thumbnails, channelTitle },
    } = item;
    this.id = id.videoId || id;
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

export const checkSearchResult = searchResult => {
  if (searchResult === null) {
    return [];
  }
  const videos = searchResult.items.map(item => new VideoItem(item));
  return videos;
};
