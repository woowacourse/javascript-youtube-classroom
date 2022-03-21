import SUCCESS_MESSAGE from '../../src/constants/successMessages';
import { REDIRECT_SERVER_HOST, YOUTUBE_SEARCH_PATH } from '../../src/constants/youtubeApi';

describe("[메인 화면]에서 '저장 목록 관리' 테스트 - 기본", () => {
  beforeEach(() => {
    cy.openSearchModal();

    cy.intercept('GET', `${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' });
  });

  it("1. 메인 화면의 '검색' 버튼을 누르면 검색 모달창이 표시된다.", () => {
    cy.openSearchModal();

    cy.get('.modal-container').should('be.visible');
  });
});

describe("[메인 화면]에서 '저장 목록 관리' 테스트 - 삭제 관련", () => {
  beforeEach(() => {
    cy.openSearchModal();
    cy.intercept('GET', `${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' });
    const inputKeyword = '우아한테크코스';
    cy.openSearchModal();
    cy.intercept('GET', `${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' });
    cy.searchKeyword(inputKeyword, 1000);
    cy.get('.video-item__save-button').click({ multiple: true });
    cy.get('.dimmer').click({ force: true }).wait(1000);
  });

  it("2. '볼 영상' 탭에서 '삭제'를 의미하는 이모지(🗑) 버튼을 클릭할 경우, 삭제 의사 재확인 모달이 표시되어야 한다.", () => {
    cy.get('.video-item__button--delete').first().click();
    cy.get('.confirm-modal__content').should('be.visible');
  });

  it("3. '삭제 의사 재확인 모달'에서 사용자가 '삭제하기' 버튼을 클릭한 경우, 해당 id의 영상이 '볼 영상' 탭에서 제거되고, 삭제 성공 toast 알림에 표시되어야 한다.", () => {
    cy.get('.video-item__button--delete')
      .first()
      .invoke('data', 'id')
      .then((deletedVideoId) => {
        cy.wrap(deletedVideoId).as('deletedVideoId');
      });

    cy.get('.video-item__button--delete').first().click();
    cy.get('.confirm-modal__delete-button').click();

    cy.get('.toast--success').should('contain', SUCCESS_MESSAGE.DELETED);

    cy.get('@deletedVideoId').then((deletedVideoId) => {
      cy.get('.unwatched-tab')
        .children('.video-item')
        .each(($item) => {
          cy.wrap($item).should('have.not.id', deletedVideoId);
        });
    });
  });

  it("4. '삭제 의사 재확인 모달'에서 사용자가 '취소하기' 버튼을 클릭한 경우, 해당 영상이 '볼 영상' 탭에서 유지되어야 한다.", () => {
    cy.get('.video-item__button--delete')
      .first()
      .invoke('attr', 'id')
      .then((deletedVideoId) => {
        cy.wrap(deletedVideoId).as('deletedVideoId');
      });

    cy.get('.video-item__button--delete').first().click();
    cy.get('.confirm-modal__cancel-button').click();

    cy.get('.toast--success').should('not.contain', SUCCESS_MESSAGE.DELETED);

    cy.get('@deletedVideoId').then((deletedVideoId) => {
      cy.get('.unwatched-tab').find('.video-item').first().should('have.id', deletedVideoId);
    });
  });
});

describe("[메인 화면]에서 '저장 목록 관리' 테스트 - 봤음 체크", () => {
  beforeEach(() => {
    cy.openSearchModal();
    cy.intercept('GET', `${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' });
    const inputKeyword = '우아한테크코스';
    cy.openSearchModal();
    cy.intercept('GET', `${REDIRECT_SERVER_HOST}/${YOUTUBE_SEARCH_PATH}*`, { fixture: 'videoItems' });
    cy.searchKeyword(inputKeyword, 1000);
    cy.get('.video-item__save-button').click({ multiple: true });
    cy.get('.dimmer').click({ force: true }).wait(1000);
  });

  it("5. '볼 영상' 탭에서 '봤음'을 의미하는 이모지(✅) 버튼을 클릭한 경우, 해당 영상이 '볼 영상' 탭에서 제거되어야 하고, '본 영상'탭에 표시되어야 한다.", () => {
    cy.get('.unwatched-tab')
      .find('.video-item')
      .first()
      .invoke('attr', 'id')
      .then((unwatchedVideoId) => {
        cy.wrap(unwatchedVideoId).as('unwatchedVideoId');
      });

    cy.get('.video-item__button--watched').first().click();

    cy.get('.nav-left__button--watched').click();

    cy.get('.watched-tab')
      .find('.video-item')
      .first()
      .invoke('attr', 'id')
      .then((watchedVideoId) => {
        cy.wrap(watchedVideoId).as('watchedVideoId');
      });

    cy.get('@unwatchedVideoId').then((unwatchedVideoId) => {
      cy.get('@watchedVideoId').then((watchedVideoId) => {
        expect(unwatchedVideoId).to.equal(watchedVideoId);
      });
    });
  });

  it("6. '본 영상' 탭에서 음영처리된 '봤음'을 의미하는 이모지(✅) 버튼을 클릭한 경우, 해당 영상이 '본 영상' 탭에서 제거되고, '볼 영상'탭에 표시되어야 한다.", () => {
    cy.get('.unwatched-tab').find('.video-item__button--watched').first().click();

    cy.get('.nav-left__button--watched').click();

    cy.get('.watched-tab')
      .find('.video-item')
      .first()
      .invoke('attr', 'id')
      .then((watchedVideoId) => {
        cy.wrap(watchedVideoId).as('watchedVideoId');
      });

    cy.get('.watched-tab').find('.video-item__button--watched').first().click();

    cy.get('.nav-left__button--unwatched').click();

    cy.get('.unwatched-tab')
      .find('.video-item')
      .first()
      .invoke('attr', 'id')
      .then((unwatchedVideoId) => {
        cy.wrap(unwatchedVideoId).as('unwatchedVideoId');
      });

    cy.get('@watchedVideoId').then((watchedVideoId) => {
      cy.get('@unwatchedVideoId').then((unwatchedVideoId) => {
        expect(watchedVideoId).to.equal(unwatchedVideoId);
      });
    });
  });
});
