import { LOCAL_STORAGE_KEY } from "../constants.js";
import VideoStorage from "./VideoStorage.js";
import PrevSearchResultStorage from "./PrevSearchResultStorage.js";
import ArrayStorage from "./ArrayStorage.js";

const videoStorage = new VideoStorage(LOCAL_STORAGE_KEY.VIDEOS);
const prevSearchResultStorage = new PrevSearchResultStorage(
  LOCAL_STORAGE_KEY.PREV_SEARCH_RESULT
);
const searchQueryStorage = new ArrayStorage(LOCAL_STORAGE_KEY.SEARCH_QUERIES);

export { videoStorage, prevSearchResultStorage, searchQueryStorage };
