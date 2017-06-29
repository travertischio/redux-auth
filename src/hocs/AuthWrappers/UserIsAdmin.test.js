import React from 'react';
// import {
//   Router,
//   Route,
// } from 'react-router';
import {
  createComponentWithIntl,
  // findActionByType,
} from 'react-unit-testing-utils';
// import { LOCATION_CHANGE } from 'react-router-redux';
import UserIsAdmin from './UserIsAdmin';
import config from '../../config';

const PageComponent = () => <div>Page only for admins</div>;
const PageOnlyForAdmins = UserIsAdmin(PageComponent);

describe('UserIsAdmin', () => {
  it('should be defined', () => {
    expect(UserIsAdmin).toBeDefined();
  });

  it('should display PageComponent when user has admin role', () => {
    const initialState = {
      auth: {
        user: {
          role: config.adminRole,
        },
      },
    };
    const { component } = createComponentWithIntl(<PageOnlyForAdmins />, initialState);

    expect(component.toJSON()).toMatchSnapshot();
  });


  describe('when user has not admin role', () => {
    // let store = null;
    let component = null;

    beforeEach(() => {
      const initialState = {
        auth: {
          user: {
            role: '10_user',
          },
        },
      };
      const componentAndStore = createComponentWithIntl(<PageOnlyForAdmins />, initialState);
      // store = componentAndStore.store;
      component = componentAndStore.component;
    });

    it('should display PageComponent when user has not admin role', () => {
      expect(component.toJSON()).toMatchSnapshot();
    });

    // it('should behave...', () => {
    //   console.log(store.getActions());
    //   const recivedAction = findActionByType(store, LOCATION_CHANGE);
    //   expect(recivedAction.type).toEqual(LOCATION_CHANGE);
    // });
  });
});
