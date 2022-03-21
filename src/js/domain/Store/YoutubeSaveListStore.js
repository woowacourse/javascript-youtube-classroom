import { ACTION_TYPE } from '@Constants/String';
import { CLASS_ROOM_SETTING } from '@Constants/Setting';
import { getTimeStamp } from '@Utils/ManageData';
import { requestYoutubeList } from '../../api';
import Store from './Abstract';
import YoutubeSaveStorage from '../YoutubeSaveStorage';

class YoutubeSaveListStore extends Store {
  state = {
    listType: 'unwatched',
    items: [],
  };

  constructor(initialState) {
    super(initialState);

    this.reducers = {
      [ACTION_TYPE.UPDATE_SAVE_LIST]: async () => {
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
      },

      [ACTION_TYPE.UPDATE_SAVE_LIST_FILTER]: listType => {
        this.setState({
          ...this.state,
          listType,
        });
      },
    };
  }

  #getExpireVideoList(videoList) {
    const expireTime = getTimeStamp() - CLASS_ROOM_SETTING.VIDEO_DATA_CACHE_EXPIRE_TIME;
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
