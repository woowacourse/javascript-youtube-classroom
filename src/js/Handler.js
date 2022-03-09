import handleSearchRequest from './domain/handleSearchRequest';

class Handler {
  constructor() {
    this.nextPageToken = null;
  }

  searchHandler = async (keyword) => {
    const { searchResultArray, nextPageToken } = await handleSearchRequest(keyword);
    this.nextPageToken = nextPageToken;
    return searchResultArray;
  };

  loadMoreHandler = async (keyword) => {
    const { searchResultArray, nextPageToken } = await handleSearchRequest(
      keyword,
      this.nextPageToken
    );
    this.nextPageToken = nextPageToken;
    return searchResultArray;
  };
}

export default Handler;
