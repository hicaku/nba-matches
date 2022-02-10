"use strict";

// https://docs.cypress.io/api/introduction/api.html
describe("Whole Page Tests", function () {
  beforeEach(function () {
    cy.visit("/");
  });
  it("Should render every element that is necessary", function () {
    cy.get(".next-button").should("be.visible");
    cy.get(".prev-button").should("not.be.visible");
    cy.get(".upcoming-matches").should("be.visible").contains("h3", "Upcoming Matches");
    cy.get(".date").should("be.visible").contains("/");
    cy.get(".versus").should("be.visible");
    cy.get(".abbr").should("be.visible");
    cy.get(".score").should("be.visible");
    cy.get(".status").should("be.visible").contains("ET");
  });
  it("Should scroll the wrapper on click to next button", function () {
    cy.get(".next-button").click();
    cy.get(".prev-button").should("be.visible");
    cy.get(".card-wrapper").then(function (objCanvas) {
      var width = objCanvas[0].offsetWidth;
      var scrollAmount = (width / 175 - 1) * 175;
      cy.get(".card-wrapper").should("have.attr", "style").should("contain", "translateX(-" + scrollAmount + "px)");
    });
  });
  it("Should load the images", function () {
    cy.get(':nth-child(1) > .scores > :nth-child(1) > .logo > img').should('be.visible').and(function ($img) {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
    cy.get(':nth-child(2) > img').should('be.visible').and(function ($img) {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });
  it("Should match the scores that is clicked on the card", function () {
    cy.get(':nth-child(1) > .scores > :nth-child(1) > .score').then(function ($homeScore) {
      var homeScore = $homeScore.text();
      cy.get(':nth-child(1) > .scores > :nth-child(2) > .score').then(function ($visitorScore) {
        var visitorScore = $visitorScore.text();
        cy.get(':nth-child(1) > .scores > :nth-child(1)').click();
        cy.get('.divider').should("be.visible").contains("FINAL");
        cy.get('.score-card > :nth-child(2)').should('have.text', homeScore);
        cy.get('.score-card > :nth-child(4)').should('have.text', visitorScore);
        var totalScore = parseInt(homeScore) + parseInt(visitorScore);
        cy.get('tr').last().contains(totalScore);
      });
    });
  });
});