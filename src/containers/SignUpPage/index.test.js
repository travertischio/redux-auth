import React from 'react';
import {
  getStoreWithInitialState,
  findActionByType,
  mountWithIntl,
  createComponentWithIntl,
} from 'react-unit-testing-utils';
import SignUpPage from './index';
// import { destroyPageAction } from './actions';
import {
  SIGN_UP_ACTION,
  // DESTROY_PAGE_ACTION,
} from './constants';

describe('<SignUpPage />', () => {
  it('should dispatch action SIGN_UP_ACTION when fill and submit the form', () => {
    const store = getStoreWithInitialState({
      auth: {
        isAuthenticated: false,
      },
      signUpPage: {},
    });

    const wrapper = mountWithIntl(<SignUpPage />, {
      store,
    });

    const firstName = 'John';
    const email = 'tester@test.com';
    const password = 'zxy123';

    wrapper.find('input[name="first_name"]').simulate('change', { target: { value: firstName } });
    wrapper.find('input[name="email"]').simulate('change', { target: { value: email } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: password } });
    wrapper.find('input[name="confirm_password"]').simulate('change', { target: { value: password } });
    wrapper.find('form').simulate('submit');

    const recivedAction = findActionByType(store, SIGN_UP_ACTION);

    expect(recivedAction.type).toEqual(SIGN_UP_ACTION);
  });

  // it('should dispatch action DESTROY_PAGE_ACTION when the component unmount', () => {
  //   const initialState = {
  //     auth: {
  //       isAuthenticated: false,
  //     },
  //     signUpPage: {},
  //   };
  //   const { component, store } = createComponentWithIntl(<SignUpPage />, initialState);
  //   component.unmount();
  //   const recivedAction = findActionByType(store, DESTROY_PAGE_ACTION);
  //   expect(recivedAction).toEqual(destroyPageAction());
  // });

  it('should NOT render SignUpPage when user IS authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        user: {},
      },
    };
    const { component } = createComponentWithIntl(<SignUpPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render SignUpPage when user IS NOT authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      signUpPage: {},
    };
    const { component } = createComponentWithIntl(<SignUpPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render SignUpPage with loading indicator when loading is in the props', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      signUpPage: {
        loading: true,
      },
    };
    const { component } = createComponentWithIntl(<SignUpPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render SignUpPage with error message when errorMessage is in the props', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      signUpPage: {
        errorMessage: 'Ooops, something went wrong, please try again later.',
      },
    };
    const { component } = createComponentWithIntl(<SignUpPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});