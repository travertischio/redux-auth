import React from 'react';
import { createComponentWithRouter } from 'react-unit-testing-utils';
import creactUserIsNotAuthenticatedAuthWrapper from './creactUserIsNotAuthenticatedAuthWrapper2';

const PageComponent = () => <div>Page only for not authenticated users</div>;
const failureRedirectPath = 'some/page';
const UserIsNotAuthenticatedAuthWrapper = creactUserIsNotAuthenticatedAuthWrapper(failureRedirectPath);
const PageOnlyForNotAuthenticatedUser = UserIsNotAuthenticatedAuthWrapper(PageComponent);

describe('UserIsNotAuthenticated with custom failure redirect path', () => {
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
