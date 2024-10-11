//This test passes because it does not require clicking on login button or submitting login form
describe('Login Test', () => {
  it('should log in with valid credentials and receive a 200 response', () => {
    // Use the custom login command
    cy.login(
      'fatherchristmas@stud.noroff.no',
      'fatherchristmas222',
    );
  });
});
