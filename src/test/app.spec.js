import { SELECTOR, ERROR_MESSAGE, YOUTUBE_API_REQUEST_COUNT } from '../js/constants/index.js';

describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  const baseURL = 'index.html';

  const submitKeywordCorrectly = () => {
    const keyword = '아놀드';

    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_INPUT_KEYWORD).type(keyword);
    cy.get(SELECTOR.SEARCH_FORM).submit();
  };

  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('검색어를 입력하지 않고 검색했을 때, 에러 메시지를 확인할 수 있어야 한다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();

    cy.get(SELECTOR.SEARCH_FORM)
      .submit()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.EMPTY_KEYWORD);
      });
  });

  it('모달에서 올바르게 검색 후, 모달을 껏다가 키면 검색어와 결과 내용이 비어있어야 한다.', () => {
    submitKeywordCorrectly();
    cy.get(SELECTOR.MODAL_BACKGROUND).click({ force: true });

    cy.get(SELECTOR.SEARCH_MODAL_BUTTON)
      .click()
      .then(() => {
        cy.get(SELECTOR.SEARCH_INPUT_KEYWORD).should('have.value', '');
        cy.get(SELECTOR.VIDEOS).children().should('have.length', YOUTUBE_API_REQUEST_COUNT);
      });
  });

  it('모달에서 영상을 저장하면, 볼 영상 목록을 업데이트 할 수 있어야 한다.', () => {
    submitKeywordCorrectly();
    cy.get('.video-item__save-button').first().click();
    cy.get(SELECTOR.MODAL_BACKGROUND).click({ force: true });

    cy.get(SELECTOR.UNSEEN_VIDEOS).children().should('have.length', 1);
  });

  it('볼 비디오의 체크 버튼을 누르면, 본 비디오 탭으로 이동해야 한다.', () => {
    submitKeywordCorrectly();
    cy.get('.video-item__save-button').first().click();
    cy.get(SELECTOR.MODAL_BACKGROUND).click({ force: true });
    cy.get(`${SELECTOR.UNSEEN_VIDEOS} .video-item__check-button`).first().click();

    cy.get(SELECTOR.SEEN_BUTTON)
      .click()
      .then(() => {
        cy.get(SELECTOR.SEEN_VIDEOS).children().should('have.length', 1);
      });
  });
});
