import { searchQueryStorage } from "../storage/";

const searchQueryService = {
  getQueries() {
    return searchQueryStorage.getItem();
  },
};

export default searchQueryService;
