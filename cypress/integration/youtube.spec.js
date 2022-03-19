import { RULES } from '../../src/js/constants';

const baseUrl = 'http://localhost:9000/';

describe('Youtube ClassRoom Test', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it(`입력창에 keyword를 입력하고 submit을 하면 ${RULES.MAX_VIDEO_AMOUNT_PER_REQUEST}개의 영상을 받아와 화면에 보여준다.`, () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword')
      .type('후이{enter}')
      .then(() => {
        cy.get('.search-modal .video-item').should(
          'have.length',
          RULES.MAX_VIDEO_AMOUNT_PER_REQUEST,
        );
      });
  });

  it('빈 입력을 하면 영상을 불러오지 않는다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword')
      .type('{enter}')
      .then(() => {
        cy.get('.search-modal .video-item').should('have.length', 0);
      });
  });
});
