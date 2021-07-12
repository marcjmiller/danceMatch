/// <reference types="cypress" />

context('Styles', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/style', { fixture: 'mockStyles.json' });
    cy.intercept('GET', '/api/song/byStyle/2', { fixture: 'mockSongsByStyle.json' });
    cy.intercept('GET', '/api/style/2', { fixture: 'mockByStyle.json' });
    cy.visit('http://localhost:3030/styles');
  });

  it('should fetch a list of dance styles', () => {
    cy.get('.header').contains(/home/i);
    cy.get('main').contains(/all styles/i);

    cy.get('.style-row')
      .children()
      .contains(/exotic style/i);
    cy.get('.style-row').contains(/superfast step/i);
    cy.get('.style-row').contains(/superslow step/i);
  });

  it('should be able to fetch a list of songs by a specific style', () => {
    cy.get('.style-row').children().contains(/superfast/i).click();
    cy.get('main').contains(/superfast step/i);

    cy.get('.song-row')
      .children()
      .contains(/maroon 55/i);
    cy.get('.song-row')
      .children()
      .contains(/sfugar/i);
    cy.get('.song-row')
      .children()
      .contains(/camillla cabellllo/i);
    cy.get('.song-row')
      .children()
      .contains(/llliar/i);
  })
});
