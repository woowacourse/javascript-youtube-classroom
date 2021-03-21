import { ERROR_MESSAGE } from '../../src/js/constants/constant.js';

describe('saved-video-ui', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5502/');
  });

  it('사이트에 접속했을때, 비디오 목록에 "저장된 영상이 없습니다. 볼 영상을 저장해주세요" 라고 표시해줘야 한다', () => {
    cy.get(SELECTOR.SAVED_NOT_FOUND).should('have.class', CLASS.SHOW);
  });

  it('동영상 검색, 첫번째 영상 저장버튼 클릭, 사이트 새로고침시, 저장한 영상 목록의 길이가 1이여야 한다.', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get(SELECTOR.SAVE_VIDEO_BUTTON).first().click();
    cy.get(`${SELECTOR.SAVED_VIDEO_WRAPPER} article`).should(
      'have.length',
      '1'
    );
  });

  it('저장한 영상의 "본 영상" 버튼을 클릭, "해당 영상의 저장 목록 위치를 변경했습니다." 라는 스낵바 div 3초간 보여진다.', () => {
    cy.get(`${SELECTOR.VIDEO_INFO_BUTTONS} .watched`)
      .first()
      .click({ force: true });
    cy.get(SELECTOR.SNACK_BAR)
      .should('have.class', CLASS.SHOW)
      .and('have.text', SNACK_BAR.LIST_MODIFIED_MESSAGE);
    cy.wait(3000);
    cy.get(SELECTOR.SNACK_BAR).should('not.have.class', CLASS.SHOW);
  });

  it('본 영상 으로 영상 이동하면, "볼 영상 목록" 버튼 클릭하면 해당 영상 안보이고, "본 영상 목록" 버튼 클릭하면, 해당 영상이 보인다.', () => {
    cy.get(`${SELECTOR.TO_WATCH_VIDEOS_BUTTON}`).click({ force: true });
    cy.get(`${SELECTOR.SAVED_VIDEO_WRAPPER} article`).should(
      'have.length',
      '0'
    );
    cy.get(`${SELECTOR.WATCHED_VIDEOS_BUTTON}`).click({ force: true });
    cy.get(`${SELECTOR.SAVED_VIDEO_WRAPPER} article`).should(
      'have.length',
      '1'
    );
  });

  it('저장한 영상의 "삭제" 버튼 클릭, "정말로 영상을 삭제하시겠습니까?" confirm 창 보여진다', () => {
    cy.window().then(window => cy.stub(window, 'confirm').as('confirm'));
    cy.get(`${SELECTOR.VIDEO_INFO_BUTTONS} .delete`)
      .first()
      .click({ force: true });
    cy.get('@confirm').should('be.calledWith', CONFIRM_MESSAGE.DELETE_VIDEO);
  });

  it('저장한 영상 삭제 확인 누르면, "영상을 목록에서 제거했습니다." 라는 스낵바 div가 3초간 보여지고, 저장한 영상 목록의 길이가 0이여야 한다.', () => {
    cy.get(`${SELECTOR.VIDEO_INFO_BUTTONS} .delete`)
      .first()
      .click({ force: true });
    cy.get(SELECTOR.SNACK_BAR)
      .should('have.class', CLASS.SHOW)
      .and('have.text', SNACK_BAR.DELETE_MESSAGE);
    cy.wait(3000);
    cy.get(SELECTOR.SNACK_BAR).should('not.have.class', CLASS.SHOW);
    cy.get(`${SELECTOR.SAVED_VIDEO_WRAPPER} article`).should(
      'have.length',
      '0'
    );
  });
});

// STEP 1
context('search-ui', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5502/');
  });
  it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭, 동영상 목록 보여진다.', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).children().should('not.exist');
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).children().should('exist');
  });
  it('검색 모달창 열고 검색창에 검색어 입력, 엔터 입력, 동영상 목록 보여진다', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).children().should('not.exist');
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).type('{enter}');
    cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).children().should('exist');
  });
  it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭하면 비디오 요소에 .skeleton 클래스명이 존재. n초후, .skeleton 클래스명 없음', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get(SELECTOR.CLIP).each(clip => {
      cy.wrap(clip).should('have.class', CLASS.SKELETON);
    });
    cy.wait(5000);
    cy.get(`${SELECTOR.SEARCH_VIDEO_WRAPPER} ${SELECTOR.CLIP}`).each(clip => {
      cy.wrap(clip).should('not.have.class', CLASS.SKELETON);
    });
  });
  it('검색 모달창 열고 검색창에 결과없는 검색어 입력, 검색버튼 누르면, 결과없음 이미지가 보여진다.', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('skdnaskfbalsdkf');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get('#search-not-found').should('exist');
  });
  it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭, 동영상 요소 10개 존재.', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get(`${SELECTOR.SEARCH_VIDEO_WRAPPER} ${SELECTOR.CLIP}`).should(
      'have.length',
      '10'
    );
  });
  it('검색 모달창 열고 검색창에 검색어 입력(100개이상있는거), 검색버튼 클릭, 10개 확인 스크롤, 20개 확인 스크롤, (5번 확인)', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    for (let videos = 10; videos <= 50; videos += 10) {
      cy.wait(3000);
      cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).scrollTo('bottom');
      cy.get(`${SELECTOR.SEARCH_VIDEO_WRAPPER} ${SELECTOR.CLIP}`).should(
        'have.length',
        videos
      );
      cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).scrollTo('bottom');
    }
  });
  it('검색 모달창 열고 검색창에 검색입력, 첫번째 동영상 저장, webstorage에 데이터 있는지 확인.', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get(SELECTOR.SAVE_VIDEO_BUTTON).first().click();
    cy.window()
      .its('localStorage')
      .invoke('getItem', STORAGE.KEY_MY_VIDEO)
      .should('not.empty');
  });
  it('검색 모달창 열고 검색창에 검색입력, 첫번째 동영상 저장, 저장버튼 안보이는지 확인', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get(SELECTOR.SAVE_VIDEO_BUTTON).first().click();
    cy.get(`${SELECTOR.SEARCH_VIDEO_WRAPPER} ${SELECTOR.SAVE_VIDEO_BUTTON}`)
      .first()
      .should('have.class', CLASS.INVISIBLE);
  });
  it('검색 모달창 열고 검색창에 검색어 입력(100개이상있는거), 검색버튼 클릭, 10개 확인 스크롤, 20개 확인 스크롤, (11번 확인) 110개 가져오고, 저장버튼 100개 누르고 이후 누르는건 저장안됨. (데이터 길이 100그대로인지 확인)', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    for (let videos = 10; videos <= 110; videos += 10) {
      cy.wait(3000);
      cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).scrollTo('bottom');
      cy.get(`${SELECTOR.SEARCH_VIDEO_WRAPPER} ${SELECTOR.CLIP}`).should(
        'have.length',
        videos
      );
      cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).scrollTo('bottom');
    }
    cy.get(
      `${SELECTOR.SEARCH_VIDEO_WRAPPER} ${SELECTOR.SAVE_VIDEO_BUTTON}`
    ).each(button => {
      cy.wait(500);
      cy.wrap(button).click();
    });

    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('@alert').should(
      'be.calledWith',
      ERROR_MESSAGE.OVER_MAX_VIDEO_LENGTH
    );
  });
  it('검색 모달창 열고 검색 입력창에 최근 검색어 storage의 가장 마지막 text가 있고 동영상 목록이 있어야 한다.', () => {
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type('우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get(SELECTOR.MODAL_CLOSE).first().click();
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).should('have.value', '우테코');
    cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    cy.get(SELECTOR.SEARCH_VIDEO_WRAPPER).children().should('exist');
  });
  it('검색 모달창 열고 검색창에 4개의 검색어를 입력했을때, 최근 검색어 목록에 3개의 검색어가 있어야 한다.', () => {
    const searchKeywords = ['우테코', '메이커준', '테크코스', '코로나'];
    cy.get(SELECTOR.SEARCH_MODAL_BUTTON).click();
    searchKeywords.forEach(keyword => {
      cy.get(SELECTOR.SEARCH_YOUTUBE_INPUT).type(keyword);
      cy.get(SELECTOR.SEARCH_YOUTUBE_BUTTON).click();
    });
    cy.get('.chip').should('have.length', '3');
  });
});
