/// <reference types="cypress" />

context('Songs', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/song', { fixture: 'mockSongs.json' });
    cy.intercept('GET', '/api/style', { fixture: 'mockStyles.json' });
    cy.intercept('GET', '/api/song/1', { fixture: 'mockSong1.json' });
    cy.intercept('GET', '/api/style/bySong/1', { fixture: 'mockStylesBySong.json' });
    cy.intercept('POST', '/api/song/add', { statusCode: 201, fixture: 'mockNewSong.json' });
    cy.intercept('/api/song/associate/1/1', { statusCode: 200 });
    cy.visit('http://localhost:3030/songs');
  });

  it('should fetch a list of songs and their details', () => {
    cy.get('.header').contains(/home/i);
    cy.get('main').contains(/all songs/i);

    cy.get('.song-row')
      .children()
      .contains(/maroon 55/i);
    cy.get('.song-row')
      .children()
      .contains(/sfugar/i);
    cy.get('.song-row')
      .children()
      .contains(/120 bpm/i);
    cy.get('.song-row')
      .children()
      .contains(/camila cabello/i);
    cy.get('.song-row').children().contains(/fryer/i);
    cy.get('.song-row')
      .children()
      .contains(/87 bpm/i);
    cy.get('.song-row').children().contains(/train/i);
    cy.get('.song-row')
      .children()
      .contains(/carry me/i);
    cy.get('.song-row')
      .children()
      .contains(/98 bpm/i);
  });

  it('should be able to get styles for a specific song and add new styles', () => {
    cy.get('.song-row')
      .children()
      .contains(/sfugar/i)
      .click();

    cy.get('.styles').contains(/styles for/i);
    cy.get('main').find('.style').its('length').should('eq', 4);
    cy.get('.button')
      .contains(/add style/i)
      .click();
    cy.get('.style-select').select('1');
  });

  it('should be able to navigate and add a song', () => {
    cy.get('.header').find('.nav').click();
    cy.get('.navMenu')
      .contains(/add a song/i)
      .click();

    cy.get('.add-label')
      .contains(/add a song:/i);
    cy.get('.artist').type('Chris Janson');
    cy.get('.name').type('Buy Me a Boat');
    cy.get('.tempo').type('{backspace}154');
    cy.get('.button')
      .contains(/submit/i)
      .click();
  });
});
