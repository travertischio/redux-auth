import React from 'react';
import { createComponentWithRouter } from 'react-unit-testing-utils';
import UserIsNotAuthenticated from './UserIsNotAuthenticated';

const PageComponent = () => <div>Page only for not authenticated users</div>;
let PageOnlyForNotAuthenticatedUser = null;

describe('UserIsNotAuthenticated', () => {
  beforeEach(() => {
    PageOnlyForNotAuthenticatedUser = UserIsNotAuthenticated(PageComponent);
  });

  it('should be defined', () => {
    expect(PageOnlyForNotAuthenticatedUser).toBeDefined();
  });

  it('should not redner PageComponent when user is authenticated', () => {
    const initialState = {
      auth: {
        tokenData: {},
        userData: {
          id: 1,
        },
      },
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForNotAuthenticatedUser, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should redner PageComponent when user is not authenticated', () => {
    const initialState = {
      auth: {},
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForNotAuthenticatedUser, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

describe('UserIsNotAuthenticated with custom failure redirect path', () => {
  const failureRedirectPath = 'some/page';

  beforeEach(() => {
    PageOnlyForNotAuthenticatedUser = UserIsNotAuthenticated(failureRedirectPath)(PageComponent);
  });

  it('should be defined', () => {
    expect(PageOnlyForNotAuthenticatedUser).toBeDefined();
  });

  it('should not redner PageComponent when user is authenticated', () => {
    const initialState = {
      auth: {
        tokenData: {},
        userData: {
          id: 1,
        },
      },
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForNotAuthenticatedUser, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should redner PageComponent when user is not authenticated', () => {
    const initialState = {
      auth: {},
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForNotAuthenticatedUser, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
