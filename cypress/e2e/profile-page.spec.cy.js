describe('Lovevery Profile UI Validations', () => {

  beforeEach(() => {
    let user = Cypress.env("username");
    let pswd = Cypress.env("pswd");
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    });
    cy.login(user, pswd);
  });

  afterEach(() => {
    cy.logout();
  });

  it('Validates Profile-Info Page Elements', () => {
    cy.wait(3000);
    cy.get('#my-account-popover').should('be.visible');
    cy.contains('This subscription has been canceled');
    //Validates side-menu elements
    cy.get('.css-1a01rea').should('be.visible');
    cy.contains('Subscription').should('be.visible').and('not.be.disabled');
    cy.contains('Upcoming Orders').should('be.visible').and('not.be.disabled');
    cy.contains('Order History').should('be.visible').and('not.be.disabled');
    cy.contains('Profile Info').should('be.visible').and('not.be.disabled');
    cy.contains('Account Settings').should('be.visible').and('not.be.disabled');
    cy.contains('Refer A Friend').should('be.visible').and('not.be.disabled');
  });

  it('Validates User Can Edit Contact Details', () => {
    let newFirstName = 'Automation' + Math.floor(Math.random() * 50);
    let newLastName = 'Tester' + Math.floor(Math.random() * 50);
    cy.wait(3000);
    cy.contains('Profile Info').click();
    cy.get('#edit-contact-details').should('be.visible').click();
    cy.get('#lovfield-first_name').click().clear().type(newFirstName);
    cy.get('#lovfield-last_name').click().clear().type(newLastName);
    cy.contains('Save').should('be.visible').click();
    cy.contains('Profile info successfully updated').should('be.visible');
    cy.contains('Cancel').should('be.visible').click();
    //Return to original name
    cy.get('#edit-contact-details').should('be.visible').click();
    cy.get('#lovfield-first_name').click().clear().type('James');
    cy.get('#lovfield-last_name').click().clear().type('Bach');
    cy.contains('Save').click();
    cy.contains('Profile info successfully updated').should('be.visible');
    cy.contains('Cancel').click();
  });

  it('Validates User Can Edit Child Details', () => {
    let newFirstName = 'Little Tiger' + Math.floor(Math.random() * 50);
    cy.wait(3000);
    cy.contains('Profile Info').click();
    cy.get('#child-0-edit').should('be.visible').click();
    cy.get('#lovfield-name').click().clear().type(newFirstName);
    cy.contains('Save').should('be.visible').click();
    cy.contains('Child info successfully updated').should('be.visible');
    cy.contains('Cancel').should('be.visible').click();
    //Return to original name
    cy.get('#child-0-edit').should('be.visible').click();
    cy.get('#lovfield-name').click().clear().type('James Bach Jr');
    cy.contains('Save').click();
    cy.contains('Child info successfully updated').should('be.visible');
    cy.contains('Cancel').click();
  });

  it('Validates User Can Edit All Address Book Fields', () => {
    let newFirstName = 'Automation' + Math.floor(Math.random() * 50);
    let newLastName = 'Tester' + Math.floor(Math.random() * 50);
    let newCompany = 'Lovevery' + Math.floor(Math.random() * 50);
    let newAddress = Math.floor(Math.random() * 500) + ' Surf Ave';
    let suite = '1000';
    let city = 'Toronto';
    let country = 'Canada';
    let province = 'Ontario';
    let zip = 'M5V 1J1';
    let phoneNumber = '555-5555';
    cy.wait(3000);
    cy.contains('Account Settings').click();
    cy.get('#edit-address-0').should('be.visible').click();
    cy.get('#first_name').click().clear().type(newFirstName);
    cy.get('#last_name').click().clear().type(newLastName);
    cy.get('#company').click().clear().type(newCompany);
    cy.get('#line1').click().clear().type(newAddress);
    cy.get('#line2').click().clear().type(suite);
    cy.get('#city').click().clear().type(city);
    cy.get('#country').select(country);
    cy.get('#state').select(province);
    cy.get('#zip_code').click().clear().type(zip);
    cy.get('#phone_number').click().clear().type(phoneNumber);
    cy.contains('Save').should('be.visible').click();
    cy.contains('Address successfully updated').should('be.visible');
    cy.contains('Cancel').should('be.visible').click();
    //Resets original address details
    cy.get('#edit-address-0').should('be.visible').click();
    cy.get('#first_name').click().clear().type('James');
    cy.get('#last_name').click().clear().type('Bach');
    cy.get('#company').click().clear().type('Lovevery');
    cy.get('#line1').click().clear().type('918 W Idaho St');
    cy.get('#line2').click().clear().type('Suite 300');
    cy.get('#city').click().clear().type('Boise');
    cy.get('#country').select('United States');
    cy.get('#state').select('Idaho');
    cy.get('#zip_code').click().clear().type('83701');
    cy.get('#phone_number').click().clear().type('877-367-3175');
    cy.contains('Save').should('be.visible').click();
    cy.contains('Address successfully updated').should('be.visible');
    cy.contains('Cancel').should('be.visible').click();
  });
})