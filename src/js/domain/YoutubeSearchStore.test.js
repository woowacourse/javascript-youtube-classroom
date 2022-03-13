import YoutubeSearchStore from './YoutubeSearchStore';
import { YOUTUBE_SEARCH_ACTION } from '../constants/action';
import * as apiModules from '../api';

describe('유튜브 강의실 검색 시도 상태 테스트', () => {
  test('검색어를 입력했을 때 상태가 정상적으로 저장되어야 한다.', () => {
    const inputKeyword = '검색어';
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD, inputKeyword);

    expect(YoutubeSearchStore.getState()).toStrictEqual({
      searchKeyword: inputKeyword,
      isLoading: true,
      isLoaded: false,
      items: [],
      nextPageToken: '',
      error: false,
    });
  });

  test('검색 결과를 업데이트 할 때 상태가 정상적으로 저장되어야 한다.', async () => {
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD, '검색어');
    const spy = jest.spyOn(apiModules, 'requestYoutubeSearch');
    spy.mockReturnValue({
      items: ['1', '2', '3'],
      nextPageToken: '1',
    });
    await YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT);
    expect(YoutubeSearchStore.getState()).toStrictEqual({
      searchKeyword: '검색어',
      isLoading: false,
      isLoaded: true,
      items: ['1', '2', '3'],
      nextPageToken: '1',
      error: false,
    });
  });
});
