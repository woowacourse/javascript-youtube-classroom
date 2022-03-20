import { API_PATHS } from '../../src/js/constants/fetcher';
import { LOCAL_STORAGE_UTIL_KEYS } from '../../src/js/constants/localStorageUtil';
import localStorageUtil from '../../src/js/modules/localStorageUtil';

describe('사용자는 검색된 비디오를 관리할 수 있다.', () => {
  const baseURL = 'http://localhost:9000/';
  const savedVideoId = 'LsOPJhe8pjY';

  it('비디오를 저장할 수 있다.', () => {
    cy.visit(baseURL);
    cy.showModal();
    cy.interceptAPIRequest(API_PATHS.SEARCH);
    cy.interceptAPIRequest(API_PATHS.GET_VIDEO);

    const validKeyword = '정상검색';

    cy.get('#search-input-keyword').type(validKeyword);
    cy.get('#search-button').click();

    cy.wait(`@${API_PATHS.SEARCH}`).then((ic) => {
      cy.get('.video-item__save-button').click();

      cy.wait(`@${API_PATHS.GET_VIDEO}`).then(() => {
        const savedVideoIdList = localStorageUtil.getArrayData(
          LOCAL_STORAGE_UTIL_KEYS.SAVED_VIDEO_LIST_KEY
        );

        expect(savedVideoIdList.includes(savedVideoId)).to.eq(true);

        localStorageUtil.setData(LOCAL_STORAGE_UTIL_KEYS.SAVED_VIDEO_LIST_KEY, []);
      });
    });
  });
  it('저장된 비디오가 있다면, 메인화면에서 확인할 수 있다.', () => {
    cy.interceptAPIRequest(API_PATHS.GET_VIDEO);
    localStorageUtil.setData(LOCAL_STORAGE_UTIL_KEYS.SAVED_VIDEO_LIST_KEY, [savedVideoId]);
    cy.visit(baseURL);

    cy.get(`.video-item[data-video-id="${savedVideoId}"]`).should('exist');
  });

  it('저장된 비디오의 체크 버튼을 클릭하면, 본 영상으로 변경된다', () => {
    cy.interceptAPIRequest(API_PATHS.GET_VIDEO);
    localStorageUtil.setData(LOCAL_STORAGE_UTIL_KEYS.SAVED_VIDEO_LIST_KEY, [savedVideoId]);
    cy.visit(baseURL);

    cy.get('.video-item__check-button').click();

    cy.get('#watched-video-section-button').click();

    cy.get(`.video-item[data-video-id="${savedVideoId}"]`).should('exist');
  });
});
