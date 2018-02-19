import React from 'react';
import {
  getStoreWithInitialState,
  findActionByType,
  mountWithIntl,
  createComponentWithRouter,
} from 'react-unit-testing-utils';
import { stateAuthenticated } from '~/test.data';
import SignInPage from './index';
import { destroyPageAction } from './actions';
import {
  SIGN_IN_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

describe('<SignInPage />', () => {
  it('should dispatch action SIGN_IN_ACTION when fill and submit the form', () => {
    const store = getStoreWithInitialState({
      auth: {},
      signInPage: {},
    });

    const wrapper = mountWithIntl(<SignInPage />, {
      store,
    });

    const email = 'tester@test.com';
    const password = 'zxy123';

    wrapper.find('input[name="email"]').simulate('change', { target: { value: email } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: password } });
    wrapper.find('form').simulate('submit');

    const recivedAction = findActionByType(store, SIGN_IN_ACTION);

    expect(recivedAction.type).toEqual(SIGN_IN_ACTION);
  });

  it('should dispatch action DESTROY_PAGE_ACTION when the component unmount', () => {
    const initialState = {
      auth: {},
      signInPage: {},
    };
    const { wrapper, store } = createComponentWithRouter(<SignInPage />, initialState);
    wrapper.unmount();
    const recivedAction = findActionByType(store, DESTROY_PAGE_ACTION);
    expect(recivedAction).toEqual(destroyPageAction());
  });

  it('should NOT render SignInPage when user IS authenticated', () => {
    const initialState = {
      ...stateAuthenticated,
      signInPage: {},
    };
    const { wrapper } = createComponentWithRouter(<SignInPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render SignInPage when user IS NOT authenticated', () => {
    const initialState = {
      auth: {},
      signInPage: {},
    };
    const { wrapper } = createComponentWithRouter(<SignInPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render SignInPage with captcha', () => {
    const initialState = {
      auth: {},
      signInPage: {
        captchaRequired: true,
      },
    };
    const { wrapper } = createComponentWithRouter(<SignInPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render SignInPage when an account is blocked', () => {
    const initialState = {
      auth: {},
      signInPage: {
        blockedAccount: true,
      },
    };
    const { wrapper } = createComponentWithRouter(<SignInPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render SignInPage with loading indicator when loading is in the props', () => {
    const initialState = {
      auth: {},
      signInPage: {
        loading: true,
      },
    };
    const { wrapper } = createComponentWithRouter(<SignInPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render SignInPage with error message when errorMessage is in the props', () => {
    const initialState = {
      auth: {},
      signInPage: {
        errorMessage: 'Unable to sign in. Please try again.',
      },
    };
    const { wrapper } = createComponentWithRouter(<SignInPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
