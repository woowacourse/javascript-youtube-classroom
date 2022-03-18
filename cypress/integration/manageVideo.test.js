import { API_PATHS } from '../../src/js/constants/fetcher';
import { WEB_STORE_KEY } from '../../src/js/constants/webStore';
import webStore from '../../src/js/modules/webStore';

describe('사용자는 검색된 비디오를 관리할 수 있다.', () => {
  const baseURL = './index.html';
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
        const savedVideoIdList = webStore.getArrayData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY);

        expect(savedVideoIdList.includes(savedVideoId)).to.eq(true);

        webStore.setData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY, []);
      });
    });
  });
  it('저장된 비디오가 있다면, 메인화면에서 확인할 수 있다.', () => {
    cy.interceptAPIRequest(API_PATHS.GET_VIDEO);
    webStore.setData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY, [savedVideoId]);
    cy.visit(baseURL);

    cy.get(`.video-item[data-video-id="${savedVideoId}"]`).should('exist');
  });

  it('저장된 비디오의 체크 버튼을 클릭하면, 본 영상으로 변경된다', () => {
    cy.interceptAPIRequest(API_PATHS.GET_VIDEO);
    webStore.setData(WEB_STORE_KEY.SAVED_VIDEO_LIST_KEY, [savedVideoId]);
    cy.visit(baseURL);

    cy.get('.video-item__check-button').click();

    cy.get('#watched-video-section-button').click();

    cy.get(`.video-item[data-video-id="${savedVideoId}"]`).should('exist');
  });
});
