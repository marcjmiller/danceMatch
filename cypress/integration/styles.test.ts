/// <reference types="cypress" />

// @ts-ignore
context('Styles', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/style', { fixture: 'mockStyles.json' });
    cy.visit('http://localhost:3030/styles');
  });

  it('should fetch a list of styles', () => {
    cy.get('.header').contains(/home/i)
    cy.get('main').contains(/all dances/i);

    cy.get('li').contains(/exotic style/i);
    cy.get('li').contains(/superfast step/i);
    cy.get('li').contains(/superslow step/i);
  });
});
