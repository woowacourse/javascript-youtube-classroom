import {
  LOCALSTORAGE_KEYS,
  SELECTORS,
} from '../../src/js/constants/constants.js';
import { videoInfo } from '../fixtures/videoInfo.js';

describe('유튜브 강의실 관리 기능', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  it('👍 좋아요 버튼을 누르면 localStorage에서 해당 영상에 대한 정보가 업데이트 되어야 한다.', async () => {
    cy.visit('http://localhost:5500/');
    localStorage.setItem(LOCALSTORAGE_KEYS.VIDEOS, JSON.stringify(videoInfo));
    cy.get(SELECTORS.CLIP.LIKE_BUTTON)
      .each(($likeButton) => {
        $likeButton.click();
      })
      .then(() => {
        const videos = JSON.parse(
          localStorage.getItem(LOCALSTORAGE_KEYS.VIDEOS)
        );

        Object.keys(videos).forEach((videoId) => {
          expect(videos[videoId].liked).to.equal(true);
        });
      });
  });

  it('볼/본 영상 및 동영상 검색 결과에서 디바이스의 가로길이에 따라 row당 적절한 video개수가 노출되어야 한다.', () => {
    localStorage.setItem(LOCALSTORAGE_KEYS.VIDEOS, JSON.stringify(videoInfo));
    cy.visit('http://localhost:5500/');
    cy.viewport(992, 1000).wait(200);
    cy.get('.video-wrapper').should(
      'have.css',
      'grid-template-columns',
      '234px 234px 234px 234px'
    );

    cy.viewport(768, 1000).wait(200);
    cy.get('.video-wrapper').should(
      'have.css',
      'grid-template-columns',
      '380px 380px'
    );

    cy.viewport(576, 1000).wait(200);
    cy.get('.video-wrapper').should(
      'have.css',
      'grid-template-columns',
      '576px'
    );
  });

  it('첫 화면에 로컬스토리지에 있는 볼 영상의 video 배열이 화면에 나타나는지 확인한다.', () => {
    const videos = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.VIDEOS));

    const videosToWatch = Object.keys(videos).filter(
      (key) => videos[key].watched === false
    );

    // 개수 확인
    cy.get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
      .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
      .not('.d-none')
      .should('have.length', Object.keys(videosToWatch).length);

    // id 확인
    cy.get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
      .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
      .not('.d-none')
      .each(($clip) => {
        cy.wrap($clip)
          .invoke('attr', 'data-video-id')
          .then(($videoId) => {
            expect(videosToWatch).to.include($videoId);
          });
      });
  });

  it("볼 영상에 있는 비디오의 '본 영상 체크 버튼 ✅'을 누르면 해당 영상이 화면에서 사라지고, 해당 화면에서 본 영상을 확인할 수 있다.", () => {
    // 볼 영상에 있는 영상중 1개 ✅ 클릭하여 본 영상 처리
    cy.get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
      .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
      .not('.d-none')
      .first()
      .find(SELECTORS.CLIP.WATCHED_BUTTON)
      .click();

    cy.get('[for="watched-button"]')
      .click()
      .then(() => {
        const videos = JSON.parse(
          localStorage.getItem(LOCALSTORAGE_KEYS.VIDEOS)
        );
        const watchedVideos = Object.keys(videos).filter(
          (key) => videos[key].watched === true
        );
        // 개수 확인
        cy.get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
          .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
          .not('.d-none')
          .should('have.length', Object.keys(watchedVideos).length);

        // id 확인
        cy.get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
          .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
          .not('.d-none')
          .each(($clip) => {
            cy.wrap($clip)
              .invoke('attr', 'data-video-id')
              .then(($videoId) => {
                expect(watchedVideos).to.include($videoId);
              });
          });
      });
  });

  it("'볼 영상'에 있는 비디오의 '삭제 버튼 🗑️'을 수르면, 정말로 삭제할 것인지 `confirm` 을 이용하여 확인 한 후, '확인'을 누르면 로컬스토리지에서 삭제 및 화면에서 사라진다.", async () => {
    const confirmStub = cy.stub();

    confirmStub.onFirstCall().returns(true);
    cy.on('window:confirm', confirmStub);

    await cy
      .get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
      .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
      .not('.d-none')
      .first()
      .find(SELECTORS.CLIP.DELETE_BUTTON)
      .click()
      .then(() => {
        expect(confirmStub.getCall(0)).to.be.calledWith(
          MESSAGES.CONFIRM.DELETE
        );
      });

    const videos = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.VIDEOS));

    const videosToWatch = Object.keys(videos).filter(
      (key) => videos[key].watched === false
    );

    cy.get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
      .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
      .not('.d-none')
      .should('have.length', Object.keys(videosToWatch).length);

    cy.get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
      .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
      .not('.d-none')
      .each(($clip) => {
        cy.wrap($clip)
          .invoke('attr', 'data-videoId')
          .then(($videoId) => {
            expect(videosToWatch).to.include($videoId);
          });
      });
  });

  it("'볼 영상'에 있는 비디오의 '본 영상 체크 버튼 ✅'을 누르면 화면에서 사라지고, '설정이 완료되었습니다.'라는 문구를 `snackbar`를 통해 보여준다.", async () => {
    await cy
      .get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
      .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
      .not('.d-none')
      .first()
      .find(SELECTORS.CLIP.WATCHED_BUTTON)
      .click();

    cy.get(SELECTORS.VIDEO_LIST.SNACKBAR)
      .should('be.visible')
      .should('have.text', MESSAGES.ACTION_SUCCESS.STATE_SETTING);
  });

  it('저장된 영상이 없을때, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.(영상 삭제 시)', () => {
    cy.get(SELECTORS.VIDEO_LIST.VIDEO_LIST_ID)
      .children(SELECTORS.VIDEO_LIST.CLIP_CLASS)
      .not('.d-none')
      .each((clip) => {
        cy.wrap(clip).find(SELECTORS.CLIP.DELETE_BUTTON).click();
      });
    cy.get(SELECTORS.VIDEO_LIST.NO_VIDEO_MESSAGE_CLASS).and('be.visible');
  });
});
