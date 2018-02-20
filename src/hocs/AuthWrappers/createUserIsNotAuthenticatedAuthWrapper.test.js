import React from 'react';
import { createComponentWithRouter } from 'react-unit-testing-utils';
import { TOKEN_STATUS_VALID } from '~/containers/AuthenticationProvider/constants';
import createUserIsNotAuthenticatedAuthWrapper from './createUserIsNotAuthenticatedAuthWrapper';

const PageComponent = () => <div>Page only for not authenticated users</div>;
const failureRedirectPath = 'some/page';
const UserIsNotAuthenticatedAuthWrapper = createUserIsNotAuthenticatedAuthWrapper(failureRedirectPath);
const PageOnlyForNotAuthenticatedUser = UserIsNotAuthenticatedAuthWrapper(PageComponent);

describe('UserIsNotAuthenticated with custom failure redirect path', () => {
  it('should be defined', () => {
    expect(PageOnlyForNotAuthenticatedUser).toBeDefined();
  });

  it('should not redner PageComponent when user is authenticated', () => {
    const initialState = {
      auth: {
        tokenData: {
          status: TOKEN_STATUS_VALID,
        },
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
