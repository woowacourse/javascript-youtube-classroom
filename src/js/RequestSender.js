import storage from './domain/storage';

class RequestSender {
  constructor(search) {
    this.search = search;
  }

  sendSearchRequest = async (keyword) => {
    const { searchResultArray } = await this.search.handleSearchRequest(keyword);
    return searchResultArray;
  };

  sendLoadMoreRequest = async () => {
    const searchResultArray = await this.search.handleLoadMoreRequest(
      this.keyword,
      this.nextPageToken
    );
    return searchResultArray;
  };

  sendSaveRequest = (id) => {
    storage.setSavedVideos(id);
  };
}

export default RequestSender;
