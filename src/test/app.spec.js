import { SELECTOR, ERROR_MESSAGE } from '../js/constants/index.js';

describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  const baseURL = 'index.html';

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
});
