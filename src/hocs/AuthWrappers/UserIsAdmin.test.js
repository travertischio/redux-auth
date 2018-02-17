import React from 'react';
import { createComponentWithRouter } from 'react-unit-testing-utils';
import config, { setConfig } from '~/config';
import UserIsAdmin from './UserIsAdmin';

const PageComponent = () => <div>Page only for admins</div>;
const PageOnlyForAdmins = UserIsAdmin(PageComponent);

describe('UserIsAdmin', () => {
  it('should be defined', () => {
    expect(UserIsAdmin).toBeDefined();
  });

  it('should redner PageComponent when user has admin role', () => {
    const initialState = {
      auth: {
        tokenData: {},
        userData: {
          role: config.adminRole,
        },
      },
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForAdmins, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should not render PageComponent when user is not authenticated', () => {
    const initialState = {
      auth: {},
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForAdmins, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should not render PageComponent when user has no admin role', () => {
    const initialState = {
      auth: {
        tokenData: {},
        userData: {
          role: '10_user',
        },
      },
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForAdmins, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should not render PageComponent when user is not authenticated', () => {
    const initialState = {
      auth: {},
    };

    const { wrapper } = createComponentWithRouter(PageOnlyForAdmins, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render PageComponent when user has admin role and admin role is change in the config', () => {
    const newAdminRole = '100_superadmin';
    const initialState = {
      auth: {
        tokenData: {},
        userData: {
          role: newAdminRole,
        },
      },
    };

    setConfig({ adminRole: newAdminRole });

    const { wrapper } = createComponentWithRouter(PageOnlyForAdmins, initialState);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
