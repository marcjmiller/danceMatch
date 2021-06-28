/// <reference types="cypress" />

// @ts-ignore
context('Home/Layout', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
  });

  it('should find the header items', () => {
    cy.get('.header').find('.nav').click();
    cy.get('.navMenu').contains(/home/i);
    cy.get('.navMenu').contains(/all styles/i);
    cy.get('.navMenu').contains(/add a style/i);
    cy.get('.navMenu').contains(/all songs/i);
    cy.get('.navMenu').contains(/add a song/i);
    cy.get('.navMenu').contains(/song search/i);
    cy.get('.header').find('.nav').click();

    cy.get('.header>.title').contains(/dancematch/i);
  });

  it('should find the welcome text and dropdown', () => {
    cy.get('.text-4xl').contains(/welcome to dancematch/i);

    cy.get('label').contains(/to get started, pick a style/i);
    cy.get('select').contains(/i want to.../i);
  });

  it('should find the footer items', () => {
    cy.get('.footer').contains(/find your next favorite song to dance to/i);
  });
});
