describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  const baseURL = 'http://localhost:9000/';

  beforeEach(() => {
    cy.visit(baseURL);
  });

  context('검색 모달창 열고 닫기 테스트', () => {
    it('메인 화면에서 검색 버튼을 누르면, 검색 모달창이 보여야 한다.', () => {
      // given
      cy.get('#modal-container').should('not.be.visible');
  
      // when
      cy.get('#search-modal-button').click();
  
      // then
      cy.get('#modal-container').should('be.visible');
    });
  
    it('검색 모달창이 열린 상태에서, 외부 영역을 클릭하면 검색 모달창이 닫힌다.', () => {
      // given
      cy.get('#search-modal-button').click();
      cy.get('#modal-container').should('be.visible');
  
      // when
      cy.get('.dimmer').click({force: true});
  
      // then
      cy.get('#modal-container').should('not.be.visible');
    });
  })

  context('검색 과정과 결과에 대한 테스트', () => {
    const submitSearchKeywordCorrectly = () => {
      cy.get('#search-modal-button').click();
      cy.get('#search-input-keyword').type('가나다');
      cy.get('#search-form').submit();
    }

    it('2글자 미만의 검색어 입력 후 제출하면, 검색어 최소 글자 수에 대한 안내 메세지가 나온다. ', () => {
      // given
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#search-modal-button').click();
  
      // when
      cy.get('#search-input-keyword').type('a');

      // then
      cy.get('#search-form').submit().then(() => {
        expect(alertStub).to.be.called;
      });
    });

    it('검색이 시작되면, 검색 결과 리스트에 스켈레톤 아이템이 나타난다.', () => {
      // when
      submitSearchKeywordCorrectly();

      // then
      cy.get('.skeleton').should('have.length', 10);
    });

    it('정상적으로 검색이 끝나면, 검색 결과 리스트에 결과 아이템이 나타난다.', () => {
      // given
      cy.intercept('GET', '**/search*').as('getSearchResult');

      // when
      submitSearchKeywordCorrectly();
      cy.wait('@getSearchResult');

      // then
      cy.get('.video-item').should('have.length', 10).and('be.visible');
    });

    it('키워드 검색이 끝난 후, 검색 결과 리스트를 끝까지 스크롤하면 추가 로딩이 시작되며 스켈레톤 아이템이 나타난다.', () => {
      // given
      cy.intercept('GET', '**/search*').as('getSearchResult');

      // when
      submitSearchKeywordCorrectly();
      cy.wait('@getSearchResult');
      cy.get('.video-item').should('have.length', 10);
      cy.get('#search-result-video-list').scrollTo('bottom');

      // then
      cy.get('.skeleton').should('have.length', 10).and('be.visible');
    });

    it('스크롤에 의한 검색 결과 추가 로딩에 성공하면, 검색 결과 리스트에 결과 아이템이 추가된다.', () => {
      // given
      cy.intercept('GET', '**/search*').as('getSearchResult');

      // when
      submitSearchKeywordCorrectly();
      cy.wait('@getSearchResult');
      cy.get('#search-result-video-list').within(() => {
        cy.get('.video-item').should('have.length', 10);
      });
      cy.get('#search-result-video-list').scrollTo('bottom');
      cy.wait('@getSearchResult');

      // then
      cy.get('.video-item').should('have.length', 20).and('be.visible');
    });

    it('검색 과정에서 에러가 발생하면, 에러 안내 화면이 나온다.', () => {
      // given
      cy.intercept('GET', '**/search*', { statusCode: 404 });

      // when
      submitSearchKeywordCorrectly();

      // then
      cy.get('#no-result-description').should('have.text', '검색 결과를 가져오는데 실패했습니다.관리자에게 문의하세요.');
    });

    it('검색 결과가 없는 경우, 검색 결과 없음 화면이 나온다.', () => {
      // given
      cy.intercept('GET', '**/search*', { items: [] });

      // when
      submitSearchKeywordCorrectly();

      // then
      cy.get('#no-result-description').should('have.text', '검색 결과가 없습니다.다른 키워드로 검색해보세요.');
    });
  })

});
