// https://docs.cypress.io/api/introduction/api.html

describe("Whole Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("All elements at the correct position", () => {
    cy.get(".next-button")
      .should("be.visible");
    cy.get(".prev-button")
      .should("not.be.visible");
    cy.get(".upcoming-matches")
      .should("be.visible")
      .contains("h3", "Upcoming Matches");
    cy.get(".date")
      .should("be.visible")
      .contains("/");
    cy.get(".versus")
      .should("be.visible");
    cy.get(".abbr")
      .should("be.visible");
    cy.get(".score")
      .should("be.visible");
    cy.get(".status")
      .should("be.visible")
      .contains("ET");
  });
  it("Next button scrolls to right", () => {
    cy.get(".next-button")
      .click();
    cy.get(".prev-button")
      .should("be.visible");
    cy.get(".card-wrapper").then((objCanvas) => {
      const width = objCanvas[0].offsetWidth;
      const scrollAmount = (width / 175 - 1) * 175;
      cy.get(".card-wrapper")
        .should("have.attr", "style")
        .should("contain", "translateX(-" + scrollAmount + "px)");
    });
  });
});
