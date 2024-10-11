/* eslint-env node, cypress */

import { apiPath } from '../../src/js/api';

Cypress.Commands.add('login', (email, password) => {
  return cy
    .request({
      method: 'POST',
      url: `${apiPath}/social/auth/login`,
      body: {
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
    });
});
