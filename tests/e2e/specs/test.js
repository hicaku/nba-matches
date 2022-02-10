// https://docs.cypress.io/api/introduction/api.html

describe("Whole Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should render every element that is necessary", () => {
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
  it("Should scroll the wrapper on click to next button", () => {
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
  it("Should load the images", () => {
    cy.get(':nth-child(1) > .scores > :nth-child(1) > .logo > img')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0) 
      })
     cy.get(':nth-child(2) > img')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0) 
      })
  });
  it("Should match the scores that is clicked on the card", () => {
    cy.get(':nth-child(1) > .scores > :nth-child(1) > .score')
      .then(($homeScore) => {
        const homeScore = $homeScore.text()
        cy.get(':nth-child(1) > .scores > :nth-child(2) > .score')
        .then(($visitorScore) => {
          const visitorScore = $visitorScore.text()
          cy.get(':nth-child(1) > .scores > :nth-child(1)')
            .click()
          // cy.get('.divider')
          //   .should('be.visible')
          //   .contains('Final');
          cy.get('.score-card > :nth-child(2)')
            .should('have.text', homeScore)
          cy.get('.score-card > :nth-child(4)')
            .should('have.text', visitorScore)
          const totalScore = parseInt(homeScore) + parseInt(visitorScore);
          cy.get('tr')
            .last()
            .contains(totalScore)
        })
      })
  });
  it("Should match the scores that is on the table", () => {
    cy.get(':nth-child(1) > .scores > :nth-child(1)')
      .click()
    const toStrings = (cells$) => Cypress._.map(cells$, 'textContent')
    const toNumbers = (texts) => Cypress._.map(texts, Number)
    const sum = (numbers) => Cypress._.sum(numbers)
    
    const sumScoreValues = Cypress._.flow([toStrings, toNumbers, sum])
    cy.get('td:nth-child(3)')
      .then(sumScoreValues)
      .then(cellsTotal => {
        cy.get('tr')
        .last()
        .contains(cellsTotal)
      })
  });
});
