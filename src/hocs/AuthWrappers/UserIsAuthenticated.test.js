import React from 'react';
import { createComponentWithRouter } from 'react-unit-testing-utils';
import UserIsAuthenticated from './UserIsAuthenticated';

const PageComponent = () => <div>Page only for authenticated users</div>;
const PageOnlyForAuthenticatedUser = UserIsAuthenticated(PageComponent);

describe('UserIsAuthenticated', () => {
  it('should be defined', () => {
    expect(PageOnlyForAuthenticatedUser).toBeDefined();
  });

  it('should redner PageComponent when user is authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        user: {
          id: 1,
        },
      },
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForAuthenticatedUser, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should not redner PageComponent when user is not authenticated', () => {
    const initialState = {
      auth: {},
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForAuthenticatedUser, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
