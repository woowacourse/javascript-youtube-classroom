export default class Video {
  constructor(videoId, videoData) {
    const { title, channelId, channelTitle, publishedAt } = videoData;

    this._id = videoId;
    this._title = title;
    this._channelId = channelId;
    this._channelTitle = channelTitle;
    this._publishedAt = new Date(publishedAt);
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get channelId() {
    return this._channelId;
  }

  get channelTitle() {
    return this._channelTitle;
  }

  get publishedAt() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return this._publishedAt.toLocaleDateString('ko-KR', options);
  }
}
