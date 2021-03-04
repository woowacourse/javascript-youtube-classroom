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
    // TODO : myVideo 변수 대신 this.#myVideo 사용하기
    const myVideo = JSON.parse(localStorage.getItem('myVideo'));
    if (myVideo.length === 100) return;
    myVideo.push(json);
    localStorage.setItem('myVideo', JSON.stringify(myVideo));
  };

  findVideoByInfo = info => {
    return (
      JSON.parse(localStorage.getItem('myVideo')).filter(
        myVideo => info.channelUrl === myVideo.channelUrl
      ).length > 0
    );
  };

  saveRecentKeyword = keyword => {
    // TODO : getITem setITem util 화
    const recentKeywords = JSON.parse(localStorage.getItem('keywords'));
    // TODO : 0, 3 상수화. 0빼도되나?, 3항연산자 대신 if문으로 할수있으면.
    const newKeywords = [...new Set([keyword, ...recentKeywords])].slice(
      0,
      recentKeywords.length < 3 ? recentKeywords.length + 1 : 3
    );

    localStorage.setItem('keywords', JSON.stringify(newKeywords));
  };

  get savedVideoLength() {
    return JSON.parse(localStorage.getItem('myVideo')).length;
  }

  get recentKeywords() {
    return JSON.parse(localStorage.getItem('keywords'));
  }
}

export default StorageModel;
