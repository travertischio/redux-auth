import React from 'react';
import {
  getStoreWithInitialState,
  findActionByType,
  mountWithIntl,
  createComponentWithIntl,
} from 'react-unit-testing-utils';
import SignInPage from './index';
import { destroyPageAction } from './actions';
import {
  SIGN_IN_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

describe('<SignInPage />', () => {
  it('should dispatch action SIGN_IN_ACTION when fill and submit the form', () => {
    const store = getStoreWithInitialState({
      auth: {
        isAuthenticated: false,
      },
      signInPage: {},
    });

    const wrapper = mountWithIntl(<SignInPage />, {
      store,
    });

    const email = 'team@arabel.la';
    const password = 'zxy123';

    wrapper.find('input[name="email"]').simulate('change', { target: { value: email } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: password } });
    wrapper.find('form').simulate('submit');

    const recivedAction = findActionByType(store, SIGN_IN_ACTION);

    expect(recivedAction.type).toEqual(SIGN_IN_ACTION);
  });

  it('should dispatch action DESTROY_PAGE_ACTION when the component unmount', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      signInPage: {},
    };
    const { component, store } = createComponentWithIntl(<SignInPage />, initialState);
    component.unmount();
    const recivedAction = findActionByType(store, DESTROY_PAGE_ACTION);
    expect(recivedAction).toEqual(destroyPageAction());
  });

  it('should NOT render SignInPage when user IS authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        user: {},
      },
    };
    const { component } = createComponentWithIntl(<SignInPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render SignInPage when user IS NOT authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      signInPage: {},
    };
    const { component } = createComponentWithIntl(<SignInPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render SignInPage with loading indicator when loading is in the props', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      signInPage: {
        loading: true,
      },
    };
    const { component } = createComponentWithIntl(<SignInPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render SignInPage with error message when errorMessage is in the props', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      signInPage: {
        errorMessage: 'Unable to sign in. Please try again.',
      },
    };
    const { component } = createComponentWithIntl(<SignInPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
