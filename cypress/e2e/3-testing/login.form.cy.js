import { apiPath } from '../../../src/js/api';
import { login } from '../../../src/js/api';

// The form below the login form needs to be closed
//before you can enter any details in the login form
//So I have added an extra bit of code to close the form below the login form for
//the test to do its job

describe('Login Function Test', () => {
  it('should login successfully with correct credentials', () => {
    cy.visit('/index.html');

    cy.get('#closeButton')
      .should('be.visible')
      .wait(500)
      .click({ force: true });

    // Fill out the login form using IDs
    cy.get('#loginEmail').type(
      'fatherchristmas@stud.noroff.no',
    );
    cy.get('#loginPassword').type('fatherchristmas222');

    // Intercept the login request
    cy.intercept('POST', `${apiPath}/social/auth/login`).as(
      'loginAttempt',
    );

    // Click on the login button using ID
    cy.get('#loginForm').submit();

    // Wait for the login request to complete
    cy.wait('@loginAttempt')
      .its('response.statusCode')
      .should('eq', 200);
  });
});
