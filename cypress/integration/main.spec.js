import { setData } from '../../src/js/Manager/SaveVideoManager';
import { FAKE_DATA, SAVE_KEY } from '../../src/js/constants';

describe('저장된 비디오를 메인 화면에서 확인할 수 있다.', () => {
  it('저장된 동영상이 있을 경우, 볼 영상에서 확인할 수 있다.', () => {
    const videoId = '3iM_06QeZi8';
    setData(SAVE_KEY, FAKE_DATA);
    cy.visit('/index.html');
    cy.get(`.video-item[data-video-id=${videoId}]`).should('exist');
  });

  it('저장된 동영상이 없는 경우 이를 사용자에게 알려준다.', () => {
    cy.visit('/index.html');
    cy.get(`.no-saved-video__image`).should('be.visible');
  });
});

describe('볼 동영상에서 본 동영상으로 변환할 수 있다.', () => {
  const videoId = '3iM_06QeZi8';
  it('체크 이모지 버튼을 누르면 본 동영상으로 전환된다.', () => {
    setData(SAVE_KEY, FAKE_DATA);
    cy.visit('/index.html');
    cy.get(`.video-item[data-video-id=${videoId}] .video-item__watched-button.button`).click();
    cy.get(`.video-item[data-video-id=${videoId}]`).should('be.not.visible');
  });

  it('본 동영상으로 탭을 전환하면 본 동영상을 확인할 수 있다.', () => {
    cy.get('#watched').click();
    cy.get(`.video-item[data-video-id=${videoId}]`).should('exist');
  });
});

describe('본 동영상에서 볼 동영상으로 변환할 수 있다.', () => {
  it('본 동영상에서 체크 이모지를 누르면 볼 동영상으로 전환된다.', () => {
    const videoId = '3iM_06QeZi8';
    setData(SAVE_KEY, FAKE_DATA);
    cy.visit('/index.html');
    cy.get(`.video-item[data-video-id=${videoId}] .video-item__watched-button`).click();
    cy.get('#watched').click();
    cy.get(`.video-item[data-video-id=${videoId}] .video-item__watched-button`).click();
    cy.get('#will-watch').click();
    cy.get(`.video-item[data-video-id=${videoId}]`).should('exist');
  });
});

describe('동영상을 삭제할 수 있다', () => {
  const videoId = '3iM_06QeZi8';

  beforeEach(() => {
    setData(SAVE_KEY, FAKE_DATA);
    cy.visit('/index.html');
  });

  it('삭제 이모지 버튼을 누르면 삭제 여부를 묻는 창이 나온다.', () => {
    cy.get(`.video-item[data-video-id=${videoId}] > div > button.video-item__delete-button`).click();
    cy.get(`#confirm-modal`).should('be.visible');
  });

  it('삭제 여부를 묻는 창에서 네 버튼을 누르면 창이 닫치고 동영상이 삭제된다', () => {
    cy.get(`.video-item[data-video-id=${videoId}] > div > button.video-item__delete-button`).click();
    cy.get('#yes-button').click();
    cy.get(`#confirm-modal`).should('be.not.visible');
    cy.get(`.video-item[data-video-id=${videoId}]`).should('not.exist');
  });

  it('삭제 여부를 묻는 창에서 아니오 버튼을 누르면 삭제 여부 창이 닫친다.', () => {
    cy.get(`.video-item[data-video-id=${videoId}] > div > button.video-item__delete-button`).click();
    cy.get('#no-button').click();
    cy.get(`#confirm-modal`).should('be.not.visible');
    cy.get(`.video-item[data-video-id=${videoId}]`).should('exist');
  });
});
