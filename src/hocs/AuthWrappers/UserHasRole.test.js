import React from 'react';
import { createComponentWithRouter } from 'react-unit-testing-utils';
import UserHasRole from './UserHasRole';

const testRoles = ['20_editor', '30_manager'];
const PageComponent = () => <div>Page only for users with specific roles</div>;
const PageOnlyForUsersWithRoles = UserHasRole(testRoles)(PageComponent);

describe('UserHasRole', () => {
  it('should be defined', () => {
    expect(PageOnlyForUsersWithRoles).toBeDefined();
  });

  it('should redner PageComponent when user has "20_editor" role', () => {
    const initialState = {
      auth: {
        user: {
          role: '20_editor',
        },
      },
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForUsersWithRoles, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should redner PageComponent when user has "30_manager" role', () => {
    const initialState = {
      auth: {
        user: {
          role: '30_manager',
        },
      },
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForUsersWithRoles, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should not render PageComponent when user has different role that specified', () => {
    const initialState = {
      auth: {
        user: {
          role: '10_user',
        },
      },
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForUsersWithRoles, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should not render PageComponent when user is not authenticated', () => {
    const initialState = {
      auth: {},
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForUsersWithRoles, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
