/// <reference types="cypress" />

// @ts-ignore
context('Songs', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/song', { fixture: 'mockSongs.json' });
    cy.visit('http://localhost:3030/songs');
  });

  it('should fetch a list of songs', () => {
    cy.get('main').contains(/all songs/i);

    cy.get('li').contains(/maroon 55 - sfugar/i);
    cy.get('li').contains(/camila cabello - liar/i);
    cy.get('li').contains(/train - marry me/i);
  });
});
