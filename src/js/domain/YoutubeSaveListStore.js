import Store from '@Core/Store';
import { ACTION_TYPE } from '@Constants/String';
import { getTimeStamp } from '@Utils/ManageData';
import { requestYoutubeList } from '../api';
import YoutubeSaveStorage from './YoutubeSaveStorage';

class YoutubeSaveListStore extends Store {
  state = {
    listType: 'unwatched',
    items: [],
  };

  setReducers() {
    this.addReducer('UPDATE_LIST', async () => {
      // 첫 로드, 저장하기, 저장 취소를 클릭할 시 업데이트
      const expireVideoList = this.#getExpireVideoList(YoutubeSaveStorage.get());
      this.#updateVideoData(expireVideoList);

      const isWatched = this.state.listType === 'watched';
      const filterItems = YoutubeSaveStorage.get().filter(
        videoState => videoState.watched === isWatched,
      );

      this.setState({
        ...this.state,
        items: filterItems,
      });
    });

    this.addReducer('UPDATE_LIST_FILTER', listType => {
      this.setState({
        ...this.state,
        listType,
      });
    });
  }

  #getExpireVideoList(videoList) {
    const expireTime = getTimeStamp() - 86400; // 상수 분리
    return videoList.reduce((previous, value, index) => {
      if (value.updateTime < expireTime) {
        previous.push({ primaryKey: index, videoId: value.id });
      }

      return previous;
    }, []);
  }

  async #updateVideoData(expireVideoList) {
    if (!expireVideoList.length) {
      return;
    }

    const { items: updateVideoList } = await requestYoutubeList(
      expireVideoList.map(({ videoId }) => videoId),
    );

    updateVideoList.forEach((videoData, index) => {
      const { videoId } = expireVideoList[index];
      YoutubeSaveStorage.update(videoId, videoData);
    });
  }
}

export default new YoutubeSaveListStore();
