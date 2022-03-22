import UIStore from './UIStore';
import { UI_ACTION, NAVIGATION } from '@Constants';

describe('UI 상태 테스트', () => {
  test('모달 열림 요청을 보내면 상태가 수정된다.', () => {
    UIStore.dispatch(UI_ACTION.OPEN_MODAL);
    expect(UIStore.getState()).toStrictEqual({
      isModalOpened: true,
      selectedTab: NAVIGATION.WATCH_LATER,
    });
  });

  test('모달 닫기 요청을 보내면 상태가 수정된다.', () => {
    UIStore.dispatch(UI_ACTION.CLOSE_MODAL);
    expect(UIStore.getState()).toStrictEqual({
      isModalOpened: false,
      selectedTab: NAVIGATION.WATCH_LATER,
    });
  });

  test('페이지 변경 요청을 보내면 상태가 수정된다.', () => {
    UIStore.dispatch(UI_ACTION.SELECT_PAGE, NAVIGATION.WATCHED);
    expect(UIStore.getState()).toStrictEqual({
      isModalOpened: false,
      selectedTab: NAVIGATION.WATCHED,
    });
  });
});
