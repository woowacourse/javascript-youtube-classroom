import YoutubeSearchStore from '../domain/YoutubeSearchStore';
import { ACTION_TYPE } from '../constants/String';

describe('유튜브 강의실 검색 시도 상태 테스트', () => {
  test('검색어를 입력했을 때 상태가 정상적으로 저장되어야 한다.', () => {
    const inputKeyword = '검색어';
    YoutubeSearchStore.dispatch(ACTION_TYPE.UPDATE_SEARCH_KEYWORD, inputKeyword);

    expect(YoutubeSearchStore.getState()).toStrictEqual({
      searchKeyword: inputKeyword,
      isLoading: true,
      isLoaded: false,
      items: [],
      nextPageToken: '',
      error: false,
    });
  });
});
