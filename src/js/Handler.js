import handleSearchRequest from './domain/handleSearchRequest';
import { getSavedVideos, setSavedVideos } from './domain/handleStorage';

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
    if (Object.keys(getSavedVideos(id)).length >= 6) {
      throw new Error('저장된 비디오의 개수가 100개를 초과했습니다.');
    }
    setSavedVideos(id);
  };
}

export default Handler;
