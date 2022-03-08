import { API_KEY } from '../../api.js';
import dummyData from '../../../dummyData.js';

export default class YoutubeMachine {
  #data;
  #searchTarget;

  set searchTarget(searchInput) {
    this.#searchTarget = searchInput;
  }

  get searchTarget() {
    return this.#searchTarget;
  }

  getURL(nextPageToken) {
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchTarget}&maxResults=10&type=video&key=${API_KEY}`;
    if (nextPageToken) {
      return URL.concat(`&pageToken=${nextPageToken}`);
    }
    return URL;
  }

  getSearchData() {
    console.log(dummyData);
    return dummyData;
    // const URL = this.getURL();
    // fetch(URL)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data.items);
    //   })
    //   .catch(error => console.log('error:', error));
  }

  getNextSearchData({ nextPageToken }) {
    const nextURL = this.getURL(nextPageToken);
    fetch(nextURL)
      .then(response => response.json())
      .then(data => console.log(data.items))
      .catch(error => console.log('error:', error));
  }
}
