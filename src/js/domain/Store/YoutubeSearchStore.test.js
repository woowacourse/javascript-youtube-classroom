import YoutubeSearchStore from './YoutubeSearchStore';
import { ACTION_TYPE } from '../../constants/String';

const defaultState = {
  searchKeyword: '',
  isLoading: false,
  isLoaded: false,
  items: [],
  totalResults: Number.MAX_SAFE_INTEGER,
  nextPageToken: '',
  error: false,
};

describe('유튜브 강의실 검색 시도 상태 테스트', () => {
  test('검색어를 입력했을 때 상태가 정상적으로 저장되어야 한다.', () => {
    const inputKeyword = '사용자 입력 검색어';

    const testState = {
      ...defaultState,
      searchKeyword: inputKeyword,
      isLoading: true,
      isLoaded: false,
    };

    YoutubeSearchStore.dispatch(ACTION_TYPE.UPDATE_SEARCH_KEYWORD, inputKeyword);
    expect(YoutubeSearchStore.getState()).toStrictEqual(testState);
  });

  test('현재 로드한 동영상의 갯수가 검색 결과의 총 갯수를 모두 불러왔을 때, 더 이상 동영상 목록을 요청하지 않아야 한다.', () => {
    const testState = {
      ...defaultState,
      isLoaded: true,
      searchKeyword: '우테코',
      items: Array(24),
      totalResults: 24,
    };

    YoutubeSearchStore.setState(testState);
    YoutubeSearchStore.dispatch(ACTION_TYPE.UPDATE_SEARCH_RESULT);

    expect(YoutubeSearchStore.getState()).toStrictEqual(testState);
  });
});
