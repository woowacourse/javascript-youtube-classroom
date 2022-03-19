import { LOAD_VIDEOS_COUNT } from '../../src/js/constant';

const $ = (selector, target = document) => target.querySelector(selector);
const $$ = (selector, target = document) => target.querySelectorAll(selector);

describe('유튜브 App 태스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });
  // it('검색을 하면(enter), 10개의 영상 데이터를 받아와서, 화면에 보여준다.', () => {
  //   cy.get($('#search-input-keyword'))
  //     .type('우테코{enter}')
  //     .then(() => {
  //       cy.get($('skeleton')).should('be.visible');
  //     });
  //   cy.get($('#video-list'));
  // });

  it('검색을 하면(enter), 10개의 skeleton UI가 보여진다.', () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword')
      .type('우테코{enter}')
      .then(() => {
        cy.get('.skeleton').should('have.length', LOAD_VIDEOS_COUNT);

        $$('.skeleton').forEach(el => cy.get(el).should('be.visible'));
      });
  });
});
