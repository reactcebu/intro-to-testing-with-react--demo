describe("My first test", () => {
  it("Does smoke!", () => {
    expect(true).to.equal(true);
  });
});

describe("Contact Form", () => {
  it("renders the form", () => {
    cy.visit("/");

    cy.contains("Newsletter");
  });

  it("shows invalid email when input is invalid", () => {
    cy.visit("/");

    cy.get("input[type='text']")
      .type("invalidemail")
      .should("have.value", "invalidemail");
    cy.contains(/Sign me up/i).click();
    cy.contains(/Email is invalid/).should("be.visible");
  });

  it("shows 'Unable to process subscribe to newsletter at the moment' when API request fails", () => {
    cy.visit("/");

    cy.get("input[type='text']")
      .type("email-500@gmail.com")
      .should("have.value", "email-500@gmail.com");
    cy.contains(/Sign me up/i).click();
    cy.contains(/Unable to process subscribe to newsletter/).should(
      "be.visible"
    );
  });

  it("shows 'Success!' when API request succeeds to process subscription", () => {
    cy.visit("/");

    cy.get("input[type='text']")
      .type("email@gmail.com")
      .should("have.value", "email@gmail.com");
    cy.contains(/Sign me up/i).click();
    cy.contains(/Success/).should("be.visible");
  });
});
