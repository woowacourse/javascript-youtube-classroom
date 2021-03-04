describe('유튜브 강의실 영상 검색 모달', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  //   it('검색어에 맞게 데이터를 잘 가져오는지 확인한다.', () => {
  //     const searchTerm = '서니';
  //     // getVideos(searchTerm).then(res => {
  //     //   expect(res.status).to.equal(200)
  //     // });
  //   });

  //   it('사용자가 검색 버튼을 누르고, 검색어를 입력하고, 검색 버튼을 눌렀을 때, 검색 결과가 화면에 나타난다.', () => {
  //     const searchTerm = '서니';

  //     cy.get('#search-button').click();
  //     cy.get('#youtube-search-input').type(searchTerm);
  //     cy.get('#youtube-search-button').click();

  //     // TODO : cypress 로 데이터 요청 이후 테스트 하는 방법으로 교체하기
  //     cy.wait(5000);

  //     cy.get('.clip').its('length').should('be.gt', 0);
  //     cy.get('.clip').its('length').should('be.lte', 10);
  //   });

  // it('사용자가 검색어를 입력하고 검색 버튼을 눌렀을 때, 최근 검색어에 추가 된다.', () => {
  //   const searchTerm = '서니';
  //   const searchTerm1 = '도비';
  //   const searchTerm2 = '하루';
  //   const searchTerm3 = '메이커준';

  //   cy.get('#search-button').click();
  //   cy.get('#youtube-search-input').type(searchTerm);
  //   cy.get('#youtube-search-button').click();

  //   cy.get('.chip').first().should('have.text', searchTerm);

  //   cy.get('#youtube-search-input').clear();
  //   cy.get('#youtube-search-input').type(searchTerm1);
  //   cy.get('#youtube-search-button').click();

  //   cy.get('.chip').first().should('have.text', searchTerm1);

  //   cy.get('#youtube-search-input').clear();
  //   cy.get('#youtube-search-input').type(searchTerm2);
  //   cy.get('#youtube-search-button').click();

  //   cy.get('.chip').first().should('have.text', searchTerm2);

  //   cy.get('#youtube-search-input').clear();
  //   cy.get('#youtube-search-input').type(searchTerm3);
  //   cy.get('#youtube-search-button').click();

  //   cy.get('.chip').first().should('have.text', searchTerm3);
  // });

  // it('사용자가 최근 검색어를 클릭하면 해당 검색어로 새로 검색이 된다.', () => {
  //   const searchTerm = '치킨';
  //   const searchTerm1 = '도비';

  //   cy.get('#search-button').click();
  //   cy.get('#youtube-search-input').type(searchTerm);
  //   cy.get('#youtube-search-button').click();

  //   cy.get('#youtube-search-input').clear();
  //   cy.get('#youtube-search-input').type(searchTerm1);
  //   cy.get('#youtube-search-button').click();
  //   cy.wait(1000);
  //   cy.get('.chip').last().click({ force: true });
  //   cy.wait(3000);
  //   cy.get('.modal .video-title').each(($elem) => {
  //     cy.wrap($elem).contains(searchTerm);
  //   });
  // });

  //   it('사용자가 검색어를 아무것도 입력하지 않았을 때, 아무반응도 일어나지 않는다.', () => {
  //     const searchTerm = '  ';

  //     cy.get('#search-button').click();
  //     cy.get('#youtube-search-input').type(searchTerm);
  //     cy.get('#youtube-search-button').click();

  //     cy.get('.chip').first().should('not.have.text', searchTerm);
  //   });

  //   it('사용자가 영상 저장 버튼을 누르면, 해당 저장 버튼이 사라지고, 우측 위 저장된 영상 개수가 1 증가한다.', () => {
  //     const searchTerm = '서니';
  //     cy.get('#saved-video-count')
  //       .invoke('text')
  //       .then(($el) => {
  //         const prevSavedVideoCount = $el;
  //         cy.get('#search-button').click();
  //         cy.get('#youtube-search-input').type(searchTerm);
  //         cy.get('#youtube-search-button').click();

  //         cy.get('.js-save-btn').first().click();

  //         cy.get('.js-save-btn').should('not.be.visible');
  //         cy.get('#saved-video-count').should(
  //           'have.text',
  //           `${Number(prevSavedVideoCount) + 1}`
  //         );
  //       });
  //   });

  //   it('사용자가 영상 저장 버튼을 눌렀을때, 현재 저장된 영상이 100개 이상인 경우, 저장불가 alert이 노출된다.', () => {
  //     // TODO: video id를 어디다 저장할지 정해야함
  //     const searchTerm = '서니';
  //     const alertStub = cy.stub();

  //     // 저장소에 video 100개 저장
  //     cy.get('#search-button').click();
  //     cy.get('#youtube-search-input').type(searchTerm);
  //     cy.get('#youtube-search-button').click();

  //     cy.on('window:alert', alertStub);
  //     cy.get('.js-save-btn')
  //       .click()
  //       .then(() => {
  //         // 저장소에 video가 100개 이상인지 체크
  //       })
  //       .then(() => {
  //         expect(alertStub.getCall(0)).to.be.calledWith('저장할 수 없습니다');
  //       });
  //   });

  it('사용자가 스크롤을 내리면, 밑에 영상이 추가된다.', () => {
    const searchTerm = '서니';
    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();
    cy.get('#searched-video-wrapper').trigger('scroll');
    cy.wait(1000);
    cy.get('.clip').its('length').should('be.gt', 10);
    // TODO : 만약 더이상 영상이 없으면 없습니다가 뜨는지 확인해야함
    cy.get('.clip').its('length').should('be.lte', 20);
  });

  //   it('사용자가 모달창을 끄고, 다시 켰을 때 기존 검색 결과가 유지된다.', () => {
  //     const searchTerm = '서니';
  //     cy.get('#search-button').click();
  //     cy.get('#youtube-search-input').type(searchTerm);
  //     cy.get('#youtube-search-button').click();

  //     cy.get('.modal-close').click();
  //     cy.get('#search-button').click();

  //     // 최근 검색어 첫번째와, 모달이 닫히기 전 검색어와 같은지 체크
  //   });

  //   it('각 영상이 제목, 작성자, 날짜가 제대로 화면에 표시되는지 확인한다.', () => {
  //     const searchTerm = '서니';
  //     cy.get('#search-button').click();
  //     cy.get('#youtube-search-input').type(searchTerm);
  //     cy.get('#youtube-search-button').click();

  //     // TODO : 실제 값과 일치하는지 확인하는 법 찾아보기
  //     cy.get('.modal .clip').each((clip) => {
  //       cy.wrap(clip).children('.preview-container').should('exist');
  //       cy.wrap(clip).find('.js-video-title').should('exist');
  //       cy.wrap(clip).find('.channel-name').should('exist');
  //       cy.wrap(clip).find('.meta').should('exist');
  //     });
  //   });
});
