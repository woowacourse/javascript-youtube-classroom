context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });
  it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭, 동영상 목록 보여진다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-video-wrapper').children().should('not.exist');
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    cy.get('#search-video-wrapper').children().should('exist');
  });

  it('검색 모달창 열고 검색창에 검색어 입력, 엔터 입력, 동영상 목록 보여진다', () => {
    cy.get('#search-button').click();
    cy.get('#search-video-wrapper').children().should('not.exist');
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').type('{enter}');
    cy.get('#search-video-wrapper').children().should('exist');
  });

  it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭하면 비디오 요소에 .skeleton 클래스명이 존재. n초후, .skeleton 클래스명 없음', () => {
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    cy.get('.clip').each(clip => {
      cy.wrap(clip).should('have.class', 'skeleton');
    });
    cy.wait(3000);
    cy.get('.clip').each(clip => {
      cy.wrap(clip).should('not.have.class', 'skeleton');
    });
  });

  it('검색 모달창 열고 검색창에 결과없는 검색어 입력, 검색버튼 누르면, 결과없음 이미지가 보여진다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').type('skdnaskfbalsdkf');
    cy.get('#search-youtube-button').click();
    cy.get('#not-found').should('exist');
  });

  it('검색 모달창 열고 검색창에 검색어 입력, 검색버튼 클릭, 동영상 요소 10개 존재.', () => {
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    cy.get('.clip').should('have.length', '10');
  });

  it('검색 모달창 열고 검색창에 검색어 입력(100개이상있는거), 검색버튼 클릭, 10개 확인 스크롤, 20개 확인 스크롤, (5번 확인)', () => {
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    for (let videos = 10; videos <= 50; videos += 10) {
      cy.wait(1000);
      cy.get('.clip').should('have.length', videos);
      cy.get('#search-video-wrapper').scrollTo('bottom');
    }
  });

  it('검색 모달창 열고 검색창에 검색입력, 첫번째 동영상 저장, webstorage에 데이터 있는지 확인.', () => {
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    cy.get('.save-button').first().click();
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'myVideo')
      .should('not.empty');
  });

  it('검색 모달창 열고 검색창에 검색입력, 첫번째 동영상 저장, 저장버튼 안보이는지 확인', () => {
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    cy.get('.save-button').first().click();
    cy.get('.clip .save-button').first().should('not.exist');
  });

  it('검색 모달창 열고 검색창에 검색어 입력(100개이상있는거), 검색버튼 클릭, 10개 확인 스크롤, 20개 확인 스크롤, (11번 확인) 110개 가져오고, 저장버튼 100개 누르고 이후 누르는건 저장안됨. (데이터 길이 100그대로인지 확인)', () => {
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    for (let videos = 10; videos <= 110; videos += 10) {
      cy.wait(1000);
      cy.get('.clip').should('have.length', videos);
      cy.get('#search-video-wrapper').scrollTo('bottom');
    }
    cy.get('.save-button').each(button => {
      cy.wrap(button).click();
    });
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'myVideo')
      .should('have.length', '100');
  });

  it('검색 모달창 열고 검색 입력창에 최근 검색어 storage의 가장 마지막 text가 있고 동영상 목록이 있어야 한다.', () => {
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').type('우테코');
    cy.get('#search-youtube-button').click();
    cy.get('.modal-close').first().click();
    cy.get('#search-button').click();
    cy.get('#search-youtube-input').should('have.value', '우테코');
    cy.get('#search-youtube-button').click();
    cy.get('#search-video-wrapper').children().should('exist');
  });

  it('검색 모달창 열고 검색창에 검색1 검색버튼, 2, 3, 4 해서, 최근검색어에 4, 3, 2 있어야 한다.', () => {
    const searchKeywords = ['우테코', '메이커준', '테크코스', '코로나'];
    cy.get('#search-button').click();

    searchKeywords.forEach(keyword => {
      cy.get('#search-youtube-input').type(keyword);
      cy.get('#search-youtube-button').click();
    });
    cy.get('.chip').should('have.length', '3');
    cy.get('.chip').each((chip, i) =>
      cy
        .wrap(chip)
        .should('have.text', searchKeywords[searchKeywords.length - i])
    );
  });
});
