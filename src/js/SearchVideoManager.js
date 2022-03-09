const DUMMY_YOUTUBE_API_ENDPOINT = (keyword) =>
  `https://brave-lichterman-77e301.netlify.app/dummy/youtube/v3/search?part=snippet&q=${keyword}&maxResults=10`;
const YOUTUBE_API_ENDPOINT = (keyword) =>
  `https://brave-lichterman-77e301.netlify.app/youtube/v3/search?part=snippet&q=${keyword}&maxResults=10`;

export default class SearchVideoManager {
  constructor() {
    this.keyword = '';
    this.nextPageToken = '';
  }

  fetchYoutubeData(keyword) {
    return fetch(YOUTUBE_API_ENDPOINT(keyword))
      .then((data) => data.json())
      .then((result) => {
        this.keyword = keyword;
        this.nextPageToken = result.nextPageToken;
        return result.items.map((item) => ({
          id: item.id.videoId,
          thumbnail: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          channelName: item.snippet.channelTitle,
          publishedDate: item.snippet.publishedAt,
        }));
      });
  }

  isKeywordChanged(newKeyword) {
    return newKeyword !== this.keyword;
  }
}
