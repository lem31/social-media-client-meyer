import { login } from '../js/api/auth/login.js';
import { save } from '../js/storage/save.js';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        accessToken: 'fake-token',
        user: 'test-user',
      }),
  }),
);

// Mock the save function
jest.mock('../js/storage/save.js', () => ({
  save: jest.fn(),
}));

describe('login', () => {
  it('should store a token when provided with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const profile = await login(email, password);

    expect(save).toHaveBeenCalledWith(
      'token',
      'fake-token',
    );
    expect(save).toHaveBeenCalledWith('profile', {
      user: 'test-user',
    });
    expect(profile).toEqual({ user: 'test-user' });
  });
});
