import {
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from '../utils/util.js';
class StorageModel {
  #myVideo;
  #keywords;

  constructor() {
    this.#myVideo = [];
    this.#keywords = [];
  }

  init() {
    setJSONToLocalStorage('myVideo', this.#myVideo);
    setJSONToLocalStorage('keywords', this.#keywords);
  }

  saveVideo = json => {
    this.#myVideo = getJSONFromLocalStorage('myVideo');
    if (myVideo.length === 100) return;
    this.#myVideo.push(json);
    setJSONToLocalStorage('myVideo', this.#myVideo);
  };

  findVideoByInfo = info => {
    return (
      getJSONFromLocalStorage('myVideo').filter(
        myVideo => info.channelUrl === myVideo.channelUrl
      ).length > 0
    );
  };

  saveRecentKeyword = keyword => {
    // TODO : getITem setITem util 화
    // TODO : 0, 3 상수화. 0빼도되나?, 3항연산자 대신 if문으로 할수있으면.
    this.#keywords = [
      ...new Set([keyword, ...getJSONFromLocalStorage('keywords')]),
    ].slice(0, this.#keywords < 3 ? this.#keywords.length + 1 : 3);

    setJSONToLocalStorage('keywords', this.#keywords);
  };

  get savedVideoLength() {
    return getJSONFromLocalStorage('myVideo').length;
  }

  get recentKeywords() {
    return getJSONFromLocalStorage('keywords');
  }
}

export default StorageModel;
