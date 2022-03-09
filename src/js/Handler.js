import handleSearchRequest from './domain/handleSearchRequest';
import { setSavedVideos } from './util/storage';

class Handler {
  constructor() {
    this.keyword = null;
    this.nextPageToken = null;
  }

  searchHandler = async (keyword) => {
    const { searchResultArray, nextPageToken } = await handleSearchRequest(keyword);
    this.keyword = keyword;
    this.nextPageToken = nextPageToken;
    return searchResultArray;
  };

  loadMoreHandler = async () => {
    if (this.nextPageToken === undefined) return null;
    const { searchResultArray, nextPageToken } = await handleSearchRequest(
      this.keyword,
      this.nextPageToken
    );
    this.nextPageToken = nextPageToken;
    return searchResultArray;
  };

  saveHandler = (id) => {
    setSavedVideos(id);
  };
}

export default Handler;
