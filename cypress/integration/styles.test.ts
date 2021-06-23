/// <reference types="cypress" />

// @ts-ignore
context('Styles', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030/styles');
  });

  it('should fetch a list of styles', () => {
    // TODO: Mock this out so we can test without using database
    // cy.intercept('GET', '/api/style', { fixture: 'mockStyles.json' }).as('getStyles');
    // cy.wait('@getStyles');
    cy.get('main').contains(/all dances/i);

    cy.get('li').contains(/bachata/i);
    cy.get('li').contains(/west coast swing/i);
    cy.get('li').contains(/tango/i);
  });
});
