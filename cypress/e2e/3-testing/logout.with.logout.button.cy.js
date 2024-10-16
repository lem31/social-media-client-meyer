import { apiPath } from '../../../src/js/api';
import { login } from '../../../src/js/api';

describe('Logout button test', () => {
  it('should logout user successfully', () => {
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

    // Click on the login button using ID
    cy.get('#loginForm').submit();

    // Intercept the login request
    cy.intercept('POST', `${apiPath}/social/auth/login`).as(
      'loginAttempt',
    );

    // Wait for the login request to complete
    cy.wait('@loginAttempt')
      .its('response.statusCode')
      .should('eq', 200);

    //Check for user access token in local storage
    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.exist;
    });

    //Click on the logout button using ID
    cy.get('#logoutButton').should('be.visible').click();

    //Check that token has been removed from local storage
    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.be
        .null;
    });
  });
});
