import React from 'react';
import {
  getStoreWithInitialState,
  findActionByType,
  mountWithIntl,
  createComponentWithRouter,
} from 'react-unit-testing-utils';
import RequestPasswordResetPage from './index';
import { destroyPageAction } from './actions';
import {
  REQUEST_PASSWORD_RESET_ACTION,
  DESTROY_PAGE_ACTION,
 } from './constants';

describe('<RequestPasswordResetPage />', () => {
  it('should dispatch action REQUEST_PASSWORD_RESET_ACTION when fill and submit the form', () => {
    const store = getStoreWithInitialState({
      auth: {
        isAuthenticated: false,
      },
      requestPasswordResetPage: {},
    });

    const wrapper = mountWithIntl(<RequestPasswordResetPage />, {
      store,
    });

    const email = 'tester@test.com';

    wrapper.find('input[name="email"]').simulate('change', { target: { value: email } });
    wrapper.find('form').simulate('submit');

    const recivedAction = findActionByType(store, REQUEST_PASSWORD_RESET_ACTION);

    expect(recivedAction.type).toEqual(REQUEST_PASSWORD_RESET_ACTION);
  });

  it('should dispatch action DESTROY_PAGE_ACTION when the component unmount', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      requestPasswordResetPage: {},
    };
    const { wrapper, store } = createComponentWithRouter(<RequestPasswordResetPage />, initialState);
    wrapper.unmount();
    const recivedAction = findActionByType(store, DESTROY_PAGE_ACTION);
    expect(recivedAction).toEqual(destroyPageAction());
  });

  it('should render RequestPasswordResetPage when user IS authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
      },
      requestPasswordResetPage: {},
    };
    const { wrapper } = createComponentWithRouter(<RequestPasswordResetPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render RequestPasswordResetPage when user IS NOT authenticated', () => {
    const initialState = {
      requestPasswordResetPage: {},
    };
    const { wrapper } = createComponentWithRouter(<RequestPasswordResetPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render RequestPasswordResetPage with loading indicator when loading is in the props', () => {
    const initialState = {
      requestPasswordResetPage: {
        loading: true,
      },
    };
    const { wrapper } = createComponentWithRouter(<RequestPasswordResetPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render RequestPasswordResetPage with success message when sent request', () => {
    const initialState = {
      requestPasswordResetPage: {
        sent: true,
      },
    };
    const { wrapper } = createComponentWithRouter(<RequestPasswordResetPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render RequestPasswordResetPage with error message when errorMessage is in the props', () => {
    const initialState = {
      requestPasswordResetPage: {
        errorMessage: 'serverErrorUnknown',
      },
    };
    const { wrapper } = createComponentWithRouter(<RequestPasswordResetPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
