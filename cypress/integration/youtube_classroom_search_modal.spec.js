describe('유튜브 강의실 영상 검색 모달', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('사용자가 검색 버튼을 누르고, 검색어를 입력하고, 검색 버튼을 눌렀을 때, 검색 결과가 화면에 나타난다.', () => {
    const searchTerm = '치킨';

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm },
    }).as('search');

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();

    cy.wait('@search');

    cy.get('.clip').its('length').should('be.gt', 0);
    cy.get('.clip').its('length').should('be.lte', 10);

    cy.get('.modal .video-title').each(($elem) => {
      cy.wrap($elem).contains(searchTerm);
    });
  });

  it('사용자가 검색 했을 때, 검색결과가 나오기 이전에 로딩중임을 skeleton UI로 보여주는지 확인한다.', () => {
    const searchTerm = '서니';

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm },
    }).as('search');

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();

    cy.get('.skeleton').should('exist');

    cy.wait('@search');

    cy.get('.skeleton').should('not.exist');

    cy.get('.clip').each((clip) => {
      cy.wrap(clip).should('not.have.attr', 'd-none');
    });
  });

  it('사용자가 검색어를 입력하고 검색 버튼을 눌렀을 때, 최근 검색어에 추가 된다.', () => {
    const searchTerm = '서니';
    const searchTerm1 = '도비';
    const searchTerm2 = '하루';
    const searchTerm3 = '메이커준';

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();

    cy.get('.chip').first().should('have.text', searchTerm);

    cy.get('#youtube-search-input').clear();
    cy.get('#youtube-search-input').type(searchTerm1);
    cy.get('#youtube-search-button').click();

    cy.get('.chip').first().should('have.text', searchTerm1);

    cy.get('#youtube-search-input').clear();
    cy.get('#youtube-search-input').type(searchTerm2);
    cy.get('#youtube-search-button').click();

    cy.get('.chip').first().should('have.text', searchTerm2);

    cy.get('#youtube-search-input').clear();
    cy.get('#youtube-search-input').type(searchTerm3);
    cy.get('#youtube-search-button').click();

    cy.get('.chip').first().should('have.text', searchTerm3);

    cy.get('#youtube-search-input').clear();
    cy.get('#youtube-search-input').type(searchTerm1);
    cy.get('#youtube-search-button').click();

    cy.get('.chip').first().should('have.text', searchTerm1);
    cy.get('.chip').should('have.length', 3);
  });

  it('검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.', () => {
    const searchTerm =
      '뜌ㅔㄹㄱ쀼ㅖㄹ또ㅕ뺴오ㅓ@~언뮴나ㅓㅓㅓㅓㅓㅓㅓㅓㅒㅛ*ㅉ요*ㅁ노쳔뮤촡뮻';
    const imgUrl = './src/images/status/not_found.png';

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm },
    }).as('search');

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();

    cy.wait('@search');

    cy.get('#searched-video-wrapper')
      .find('img')
      .should('have.attr', 'src', imgUrl);
  });

  it('사용자가 최근 검색어를 클릭하면 해당 검색어로 새로 검색이 된다.', () => {
    const searchTerm1 = '치킨';
    const searchTerm2 = '도비';

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm1 },
    }).as('search1');

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm2 },
    }).as('search2');

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm1);
    cy.get('#youtube-search-button').click();

    cy.wait('@search1');

    cy.get('#youtube-search-input').clear();
    cy.get('#youtube-search-input').type(searchTerm2);
    cy.get('#youtube-search-button').click();

    cy.wait('@search2');

    cy.get('.chip').last().click({ force: true });

    cy.wait('@search1');

    cy.get('.modal .video-title').each(($elem) => {
      cy.wrap($elem).contains(searchTerm1);
    });
  });

  it('사용자가 검색어를 아무것도 입력하지 않았을 때, 아무반응도 일어나지 않는다.', () => {
    const searchTerm = '  ';

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();

    cy.get('.skeleton').should('not.exist');
  });

  it('사용자가 영상 저장 버튼을 누르면, 해당 저장 버튼이 사라지고, 우측 위 저장된 영상 개수가 1 증가한다.', () => {
    const searchTerm = '도비';

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm },
    }).as('search');

    cy.get('#saved-video-count')
      .invoke('text')
      .then(($el) => {
        const prevSavedVideoCount = $el;
        cy.get('#search-button').click();
        cy.get('#youtube-search-input').type(searchTerm);
        cy.get('#youtube-search-button').click();

        cy.wait('@search');

        cy.get('.save-btn').first().click();

        cy.get('.save-btn').first().should('not.be.visible');
        cy.get('#saved-video-count').should(
          'have.text',
          `${Number(prevSavedVideoCount) + 1}`
        );
      });
  });

  it('사용자가 영상 저장 버튼을 눌렀을때, 현재 저장된 영상이 100개 이상인 경우, 저장불가 alert이 노출된다.', () => {
    const searchTerm = '서니';
    const alertStub = cy.stub();

    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(JSON.stringify({ videoId: '1234' }));
    }
    localStorage.setItem('videos', JSON.stringify(array));

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm },
    }).as('search');

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();

    cy.wait('@search');

    cy.on('window:alert', alertStub);
    cy.get('.save-btn')
      .first()
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          '동영상은 100개까지 저장할 수 있습니다. 저장된 동영상을 지워주세요.'
        );
      });
  });

  it('사용자가 스크롤을 내리면, 밑에 영상이 추가된다.', () => {
    const searchTerm = '서니';
    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm },
    }).as('search');
    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();
    cy.wait('@search');
    cy.get('#searched-video-wrapper').trigger('scroll');
    cy.wait('@search');
    cy.get('.clip').its('length').should('be.gt', 10);
    cy.get('.clip').its('length').should('be.lte', 20);
  });

  it('사용자가 모달창을 끄고, 다시 켰을 때 기존 검색 결과가 유지된다.', () => {
    const searchTerm = '서니';

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm },
    }).as('search');

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();

    cy.wait('@search');

    cy.get('.modal-close').click();
    cy.get('#search-button').click();

    cy.get('#youtube-search-input').should('have.value', searchTerm);
  });

  it('각 영상이 제목, 작성자, 날짜가 제대로 화면에 표시되는지 확인한다.', () => {
    const searchTerm = '서니';

    cy.intercept({
      url: 'https://www.googleapis.com/youtube/v3/search?',
      query: { q: searchTerm },
    }).as('search');

    cy.get('#search-button').click();
    cy.get('#youtube-search-input').type(searchTerm);
    cy.get('#youtube-search-button').click();

    cy.wait('@search');
    cy.get('.modal .clip').each((clip) => {
      cy.wrap(clip).children('.preview-container').should('exist');
      cy.wrap(clip).find('.video-title').should('exist');
      cy.wrap(clip).find('.channel-name').should('exist');
      cy.wrap(clip).find('.meta').should('exist');
    });
  });
});
