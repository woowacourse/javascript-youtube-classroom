class StorageModel {
  #myVideo;
  #keywords;

  constructor() {
    this.#myVideo = [];
    this.#keywords = [];
  }

  init() {
    localStorage.setItem('myVideo', JSON.stringify(this.#myVideo));
    localStorage.setItem('keywords', JSON.stringify(this.#keywords));
  }

  saveVideo = json => {
    // TODO : util에 addItem(변수명, 넣어줄요소) 만들기
    const myVideo = JSON.parse(localStorage.getItem('myVideo'));
    if (myVideo.length === 100) return;
    myVideo.push(json);
    localStorage.setItem('myVideo', JSON.stringify(myVideo));
  };

  // info를 받아 getItem해서 getItem에 해당 요소가 있는지 반환 (T/F)
  findVideoByInfo = info => {
    return (
      JSON.parse(localStorage.getItem('myVideo')).filter(
        myVideo => info.channelUrl === myVideo.channelUrl
      ).length > 0
    );
  };

  saveRecentKeyword = keyword => {
    // get set util 화
    const recentKeywords = JSON.parse(localStorage.getItem('keywords'));
    recentKeywords.unshift(keyword);
    const newKeywords = [...new Set(recentKeywords)].slice(
      0,
      recentKeywords.length < 3 ? recentKeywords.length : 3
    );

    localStorage.setItem('keywords', JSON.stringify(newKeywords));
  };

  get recentKeywords() {
    return JSON.parse(localStorage.getItem('keywords'));
  }
}

export default StorageModel;
