import { apiPath } from '../../../src/js/api';
import { login } from '../../../src/js/api';

//Test does not work because no event listener has been added to the form/login button

describe('Login Function Test', () => {
  it('should login successfully with correct credentials', () => {
    cy.visit('/index.html');

    cy.get('#closeButton').click();

    // Fill out the login form using IDs
    cy.get('#loginEmail')
      .first()
      .type('fatherchristmas@stud.noroff.no');
    cy.get('#loginPassword')
      .first()
      .type('fatherchristmas222');

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
