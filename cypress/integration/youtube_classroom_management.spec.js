import { LOCALSTORAGE_KEYS } from '../../src/js/constants/constants.js';

describe('유튜브 강의실 관리 기능', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  // TODO : dummy file 이용해서 임의로 local storage 에 들어갈 정보 생성 및 주입.
  it('첫 화면에 로컬스토리지에 있는 볼 영상의 video 배열이 화면에 나타나는지 확인한다.', () => {
    const videos = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.VIDEOS)); // Watched : t/f

    const videosToWatch = Object.keys(videos).filter(
      (key) => videos[key].watched === false
    );

    // 개수 확인
    cy.get('.video-wrapper')
      .children('.clip')
      .should('have.length', Object.keys(videosToWatch).length);

    // id 확인
    cy.get('.video-wrapper')
      .children('.clip')
      .each(($clip) => {
        cy.wrap($clip)
          .invoke('attr', 'data-videoId')
          .then(($videoId) => {
            expect(videosToWatch).to.include($videoId);
          });
      });
  });

  it("볼 영상에 있는 비디오의 '본 영상 체크 버튼 ✅'을 누르면 해당 영상이 화면에서 사라지고, 해당 화면에서 본 영상을 확인할 수 있다.", () => {
    // 볼 영상에 있는 영상중 1개 ✅ 클릭하여 본 영상 처리
    const videos = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.VIDEOS));

    cy.get('.video-wrapper').children('.clip').first().find('.✅').click();
    cy.get('#watched-button').click();
    const watchedVideos = Object.keys(videos).filter(
      (key) => videos[key].watched === true
    );

    // 개수 확인
    cy.get('.video-wrapper')
      .children('.clip')
      .should('have.length', Object.keys(watchedVideos).length);

    // id 확인
    cy.get('.video-wrapper')
      .children('.clip')
      .each(($clip) => {
        cy.wrap($clip)
          .invoke('attr', 'data-videoId')
          .then(($videoId) => {
            expect(watchedVideos).to.include($videoId);
          });
      });
  });

  it("'볼 영상'에 있는 비디오의 '삭제 버튼 🗑️'을 수르면, 정말로 삭제할 것인지 `confirm` 을 이용하여 확인 한 후, '확인'을 누르면 로컬스토리지에서 삭제 및 화면에서 사라진다.", () => {
    const confirmStub = cy.stub();

    confirmStub.onFirstCall().returns(true);
    cy.on('window:confirm', confirmStub);

    cy.get('.video-wrapper')
      .children('.clip')
      .first()
      .find('.🗑️')
      .click()
      .then(() => {
        expect(confirmStub.getCall(0)).to.be.calledWith(
          '정말로 삭제하시겠습니까?'
        );
      });

    const videos = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.VIDEOS));

    const videosToWatch = Object.keys(videos).filter(
      (key) => videos[key].watched === false
    );

    cy.get('.video-wrapper')
      .children('.clip')
      .should('have.length', Object.keys(videosToWatch).length);

    cy.get('.video-wrapper')
      .children('.clip')
      .each(($clip) => {
        cy.wrap($clip)
          .invoke('attr', 'data-videoId')
          .then(($videoId) => {
            expect(videosToWatch).to.include($videoId);
          });
      });
  });

  it("'볼 영상'에 있는 비디오의 '본 영상 체크 버튼 ✅'을 누르면 화면에서 사라지고, '본영상으로 저장에 성공 했습니다'라는 문구를 `snackbar`를 통해 보여준다.", () => {
    cy.get('.video-wrapper').children('.clip').first().find('.✅').click();
    cy.get('#snackbar')
      .should('be.visible')
      .should('have.text', '본영상으로 저장에 성공 했습니다');
  });
});
