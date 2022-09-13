//custom login function
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.wait(3000)
    cy.contains(' Sign In ').should('be.visible');
    cy.contains(' Sign In ').click();
    cy.get('#email').should('be.visible');
    cy.get('#email').clear();
    cy.get('#email').type(username);
    cy.get('#password').should('be.visible');
    cy.get('#password').clear();
    cy.get('#password').type(password);
    cy.wait(1000);
    cy.get('#form-submit-button').should('be.enabled');
    cy.get('#form-submit-button').click();
    cy.wait(1000);
})

Cypress.Commands.add('logout', () => {
    cy.get('#my-account-popover').trigger('mouseover')
    cy.contains('Logout').click({force: true});
    cy.wait(1000);
})
