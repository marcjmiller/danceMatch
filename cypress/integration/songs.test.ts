/// <reference types="cypress" />

// @ts-ignore
context('Songs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030/songs');
  });

  it('should fetch a list of songs', () => {
    // TODO: Mock this out so we can test without using database
    // cy.intercept('GET', '/api/style', { fixture: 'mockStyles.json' }).as('getStyles');
    // cy.wait('@getStyles');
    cy.get('main').contains(/all songs/i);

    cy.get('li').contains(/maroon 5/i);
    cy.get('li').contains(/camila cabello/i);
    cy.get('li').contains(/marry me/i);
  });
});
