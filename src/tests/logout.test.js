import { logout } from '../js/api/auth/logout.js';

global.localStorage = {
  removeItem: jest.fn(),
};

const remove = jest.fn();

describe('logout', () => {
  beforeEach(() => {
    remove.mockClear();
  });

  it('should remove token from browser storage when called', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
  });
});
