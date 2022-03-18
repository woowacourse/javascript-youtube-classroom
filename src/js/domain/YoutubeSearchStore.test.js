import YoutubeSearchStore from './YoutubeSearchStore';
import { YOUTUBE_SEARCH_ACTION } from '../constants';
import * as apiModules from '../api';

describe('유튜브 강의실 검색 관련 상태 테스트', () => {
  test('검색어를 입력했을 때 상태가 정상적으로 저장되어야 한다.', () => {
    const inputKeyword = '검색어';
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD, inputKeyword);

    expect(YoutubeSearchStore.getState()).toStrictEqual({
      searchKeyword: inputKeyword,
      isEnded: false,
      isLoading: true,
      isLoaded: false,
      items: [],
      nextPageToken: '',
      error: false,
    });
  });

  test('검색 결과 업데이트 요청 할 때 상태가 정상적으로 저장되어야 한다.', async () => {
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD, '검색어');
    const spy = jest.spyOn(apiModules, 'requestYoutubeSearch');
    spy.mockReturnValue({
      items: [],
      nextPageToken: '',
      pageInfo: { totalResults: 100 },
    });
    await YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_REQUEST);
    expect(YoutubeSearchStore.getState()).toStrictEqual({
      searchKeyword: '검색어',
      isEnded: false,
      isLoading: true,
      isLoaded: false,
      items: [],
      nextPageToken: '',
      error: false,
    });
  });

  test('검색 결과 업데이트 성공 할 때 상태가 정상적으로 저장되어야 한다.', async () => {
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD, '검색어');
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_SUCCESS, {
      items: [1, 2, 3],
      nextPageToken: '1',
      pageInfo: { totalResults: 10 },
    });
    expect(YoutubeSearchStore.getState()).toStrictEqual({
      searchKeyword: '검색어',
      isEnded: false,
      isLoading: false,
      isLoaded: true,
      items: [1, 2, 3],
      nextPageToken: '1',
      error: false,
    });
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_SUCCESS, {
      items: [4, 5, 6],
      nextPageToken: '2',
      pageInfo: { totalResults: 10 },
    });
    expect(YoutubeSearchStore.getState()).toStrictEqual({
      searchKeyword: '검색어',
      isLoading: false,
      isEnded: false,
      isLoaded: true,
      items: [1, 2, 3, 4, 5, 6],
      nextPageToken: '2',
      error: false,
    });
  });

  test('검색 결과 업데이트 실패 할 때 상태가 정상적으로 저장되어야 한다.', async () => {
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD, '검색어');
    YoutubeSearchStore.dispatch(YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_FAIL);
    expect(YoutubeSearchStore.getState()).toStrictEqual({
      searchKeyword: '검색어',
      isLoading: false,
      isEnded: false,
      isLoaded: true,
      items: [],
      nextPageToken: '',
      error: true,
    });
  });
});
