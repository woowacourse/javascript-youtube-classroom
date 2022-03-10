const DUMMY_YOUTUBE_API_ENDPOINT = (keyword) =>
  `https://brave-lichterman-77e301.netlify.app/dummy/youtube/v3/search?part=snippet&q=${keyword}&maxResults=10`;
const YOUTUBE_API_ENDPOINT = (keyword) =>
  `https://brave-lichterman-77e301.netlify.app/youtube/v3/search?part=snippet&q=${keyword}&maxResults=10`;
const YOUTUBE_API_ENDPOINT2 = (keyword) =>
  `https://elastic-goldstine-10f16a.netlify.app/youtube/v3/search?part=snippet&q=${keyword}&maxResults=10`;
const WRONG_API_ENDPOINT = (keyword) =>
  `https://elastic-goldstine-10f16a.netlify.app/search?part=snippettt&q=${keyword}&maxResults=10`;

export default class SearchVideoManager {
  constructor() {
    this.keyword = '';
    this.nextPageToken = '';
    this.totalResultCount = 0;
    this.currentSearch = {
      fetchedResultCount: 0,
      totalResultCount: 0,
    };
  }

  resetNextPageToken() {
    this.nextPageToken = '';
    this.currentSearch.fetchedResultCount = 0;
    this.currentSearch.totalResultCount = 0;
  }

  isLastPage() {
    return (
      this.currentSearch.fetchedResultCount !== 0 &&
      this.currentSearch.totalResultCount !== 0 &&
      this.currentSearch.totalResultCount === this.currentSearch.fetchedResultCount
    );
  }

  fetchYoutubeData(keyword) {
    return fetch(
      this.nextPageToken
        ? `${DUMMY_YOUTUBE_API_ENDPOINT(keyword)}&pageToken=${this.nextPageToken}`
        : DUMMY_YOUTUBE_API_ENDPOINT(keyword)
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        this.keyword = keyword;
        this.currentSearch.totalResultCount = result.pageInfo.totalResults;
        this.currentSearch.fetchedResultCount += result.pageInfo.resultsPerPage;
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

  search(newKeyword = this.keyword) {
    if (newKeyword !== this.keyword) {
      this.resetNextPageToken();
    }
    return this.fetchYoutubeData(newKeyword);
  }
}
