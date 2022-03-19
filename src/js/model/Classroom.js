export class Classroom {
  constructor() {
    this.videoList;
  }

  hasNoWillSeeVideo() {
    return this.videoList.filter((video) => video.watchLater === true).length === 0;
  }
  hasNoAlreadyWatchVideo() {
    return this.videoList.filter((video) => video.watchLater === false).length === 0;
  }
}
