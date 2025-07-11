describe('Customer Form', () => {
  beforeEach(() => {
    cy.visit('/customer');
  });

  it('Updates form input value and saves form', () => {
    cy.contains('First name').should('exist');

    cy.get('input[formcontrolname="firstName"]')
      .clear()
      .type('Siim2')
      .should('have.value', 'Siim');

    cy.contains('Save').click();

    cy.contains('Details updated successfully!').should('exist');
  });
});
