"use strict";

// https://docs.cypress.io/api/introduction/api.html
describe("Whole Page Tests", function () {
  beforeEach(function () {
    cy.visit("/");
  });
  it("All elements at the correct position", function () {
    cy.get(".next-button").should("be.visible");
    cy.get(".prev-button").should("not.be.visible");
    cy.get(".upcoming-matches").should("be.visible").contains("h3", "Upcoming Matches");
    cy.get(".date").should("be.visible").contains("/");
    cy.get(".versus").should("be.visible");
    cy.get(".abbr").should("be.visible");
    cy.get(".score").should("be.visible");
    cy.get(".status").should("be.visible").contains("ET");
  });
  it("Next button scrolls to right", function () {
    cy.get(".next-button").click();
    cy.get(".prev-button").should("be.visible");
    cy.get(".card-wrapper").then(function (objCanvas) {
      var width = objCanvas[0].offsetWidth;
      var scrollAmount = (width / 175 - 1) * 175;
      cy.get(".card-wrapper").should("have.attr", "style").should("contain", "translateX(-" + scrollAmount + "px)");
    });
  });
  it("Loads the images", function () {
    cy.get(':nth-child(1) > .scores > :nth-child(1) > .logo > img').should('be.visible').and(function ($img) {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
    cy.get(':nth-child(2) > img').should('be.visible').and(function ($img) {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });
});