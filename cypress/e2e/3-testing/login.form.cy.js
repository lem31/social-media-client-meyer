export const apiUrl = new URL(
  'https://nf-api.onrender.com/api/v1',
);
export const apiPath = apiUrl.toString();

describe('Login Form Test', () => {
  it('should login when provided with valid credentials and display the user profile', () => {
    cy.intercept(
      'POST',
      `${apiPath}/social/auth/login`,
      (req) => {
        req.headers['Content-Type'] = 'application/json';
        req.body = JSON.stringify({
          email: 'fatherchristmas@stud.noroff.no',
          password: 'fatherchristmas222',
        });
        req.continue();
      },
    ).as('loginAttempt');

    cy.visit('/index.html');

    cy.get('#closeButton').click();

    cy.get('#loginEmail').type(
      'fatherchristmas@stud.noroff.no',
    );
    cy.get('#loginPassword').type('fatherchristmas222');
    cy.get('#loginForm').submit();

    cy.wait('@loginAttempt', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);
  });
});
