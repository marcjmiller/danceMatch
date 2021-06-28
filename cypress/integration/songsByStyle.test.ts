/// <reference types="cypress" />

// @ts-ignore
context('Songs by Style', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/song/byStyle/2', { fixture: 'mockSongsByStyle.json' });
    cy.intercept('GET', '/api/style/2', { fixture: 'mockByStyle.json' });
    cy.visit('http://localhost:3030/songs/byStyle/2');
  });

  it('should fetch a list of songs matching Cha Cha (style 2)', () => {
    cy.get('.header').contains(/home/i);
    cy.get('main').contains(/songs matching cha cha/i);

    cy.get('li').contains(/maroon 55 - sfugar/i);
    cy.get('li').contains(/camillla cabellllo - llliar/i);
  });
});
