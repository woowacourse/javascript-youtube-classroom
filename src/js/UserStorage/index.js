import ValidationError from '../ValidationError/index.js';

const UserStorage = {
  getVideoIds() {
    return JSON.parse(localStorage.getItem('videoIds')) || [];
  },

  addVideoId(videoId) {
    const videoIds = this.getVideoIds();

    if (videoIds.length >= 100) throw new ValidationError('100개보다 많이 저장할 수 없습니다.');
		
    videoIds.push(videoId);
    localStorage.setItem('videoIds', JSON.stringify(videoIds));
  },
};

export default UserStorage;
