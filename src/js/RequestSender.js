import storage from './domain/storage';

class RequestSender {
  constructor(search) {
    this.search = search;
  }

  sendSearchRequest = async (keyword) => {
    const { searchResultArray, hasNextPage } = await this.search.handleSearchRequest(keyword);
    return { searchResultArray, hasNextPage };
  };

  sendSaveRequest = (id) => {
    storage.setSavedVideos(id);
  };
}

export default RequestSender;
