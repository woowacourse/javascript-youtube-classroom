import { ERROR_MESSAGE, GUIDE_MESSAGE } from '../../src/js/constants';

describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const submitSearchKeywordCorrectly = () => {
    cy.get('#search-modal-button').click();
    cy.get('#search-input-keyword').type('가나다');
    cy.get('#search-form').submit();
  }

  const saveFirstVideoInSearchResult = () => {
    cy.intercept('GET', '**/search*').as('getSearchResult');

    // when
    submitSearchKeywordCorrectly();
    cy.wait('@getSearchResult');

    cy.get('#search-result-video-list').within(() => {
      cy.get('.video-item').first().as('firstVideo');
    })
    cy.get('@firstVideo').within(() => {
      cy.get('.video-save-button').click();
    });
    cy.get('.dimmer').click({force: true});

    return cy.get('@firstVideo');
  }

  context('홈 화면에 대한 테스트', () => {
    it('가장 처음 페이지 방문 시, 볼 영상 리스트가 보여야 한다.', () => {
      cy.get('#unwatched-video-list').should('be.visible');
      cy.get('#watched-video-list').should('not.be.visible');
    });

    
    it('볼 영상 버튼을 클릭하면, 볼 영상 리스트가 보여야 한다.', () => {
      // when
      cy.get('#unwatched-video-list-button').click();

      // then
      cy.get('#unwatched-video-list').should('be.visible');
      cy.get('#watched-video-list').should('not.be.visible');
    });

    it('본 영상 버튼을 클릭하면, 본 영상 리스트가 보여야 한다.', () => {
      // when
      cy.get('#watched-video-list-button').click();

      // then
      cy.get('#unwatched-video-list').should('not.be.visible');
      cy.get('#watched-video-list').should('be.visible');
    });
  });

  context('검색 모달창에 대한 테스트', () => {
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
  });

  context('검색에 대한 테스트', () => {

    it('2글자 미만의 검색어 입력 후 제출하면, 검색어 최소 글자 수에 대한 안내 메세지가 나온다. ', () => {
      // given
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#search-modal-button').click();
  
      // when
      cy.get('#search-input-keyword').type('a');

      // then
      cy.get('#search-form').submit().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
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

  });
  
  context('영상 카드의 저장 버튼과 아이콘 버튼에 대한 테스트', () => {

    it('검색 결과의 영상 카드에서 저장 버튼을 누르면, 저장 버튼이 사라진다.', () => {
      // given
      cy.intercept('GET', '**/search*').as('getSearchResult');

      // when
      submitSearchKeywordCorrectly();
      cy.wait('@getSearchResult');
      cy.get('.video-item').first().within(() => {
        cy.get('.video-save-button').click();
        // then
        cy.get('.video-save-button').should('not.exist');
      })
    });

    it('검색 결과의 영상 카드에서 저장 버튼을 누르면, 해당 영상이 볼 영상에 추가된다.', () => {
      // when
      const savedFirstVideo = saveFirstVideoInSearchResult();
      savedFirstVideo.invoke('attr', 'data-id').then((savedVideoID) => {
        cy.get('#unwatched-video-list').within(() => {

          // then
          cy.get('.video-item').should('have.length', 1);
          cy.get('.video-item').invoke('attr', 'data-id').should('eq', savedVideoID);
        })
      })
    });

    it('볼 영상의 영상 카드에서 ✅ 버튼을 클릭하면, 해당 영상 카드가 본 영상으로 이동한다.', () => {
      // when
      saveFirstVideoInSearchResult();

      cy.get('#unwatched-video-list').within(() => {
        cy.get('.video-item').as('unwatchedVideo');
        cy.get('@unwatchedVideo').within(() => {
          cy.get('.check-watched-button').click();
        })
      });

      cy.get('#watched-video-list-button').click();
      cy.get('#watched-video-list').within(() => {
        cy.get('@unwatchedVideo').invoke('attr', 'data-id').then((checkedVideoID) => {

          // then
          cy.get(`[data-id=${checkedVideoID}]`).should('exist').and('be.visible');
        })
      })
    })

    it('본 영상의 영상 카드에서 ✅ 버튼을 클릭하면, 해당 영상 카드가 볼 영상으로 이동한다.', () => {
      // when
      saveFirstVideoInSearchResult();

      cy.get('#unwatched-video-list').within(() => {
        cy.get('.video-item').within(() => {
          cy.get('.check-watched-button').click();
        })
      });
      cy.get('#watched-video-list-button').click();
      cy.get('#watched-video-list').within(() => {
        cy.get('.video-item').as('watchedVideo');
        cy.get('@watchedVideo').within(() => {
          cy.get('.check-watched-button').click();
        })
      })

      cy.get('#unwatched-video-list-button').click();
      cy.get('#unwatched-video-list').within(() => {
        cy.get('@watchedVideo').invoke('attr', 'data-id').then((checkedVideoID) => {

          // then
          cy.get(`[data-id=${checkedVideoID}]`).should('exist').and('be.visible');
        })
      })
    })

    it('저장된 영상 카드에서 🗑️ 버튼을 클릭하면, 삭제 재확인 안내 메세지가 나온다.', () => {
      // given
      const confirmStub = cy.stub();
      cy.on('window:confirm', confirmStub);

      // when
      saveFirstVideoInSearchResult();
      cy.get('#unwatched-video-list').within(() => {
        cy.get('.video-item').within(() => {
          cy.get('.delete-button').click().then(() => { 

            // then
            expect(confirmStub).to.be.calledWith(GUIDE_MESSAGE.CONFIRM_DELETE);
          });
        })
      });
    })

  });

});
