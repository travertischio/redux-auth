import React from 'react';
import {
  getStoreWithInitialState,
  findActionByType,
  mountWithIntl,
  createComponentWithIntl,
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

    const email = 'team@arabel.la';

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
    const { component, store } = createComponentWithIntl(<RequestPasswordResetPage />, initialState);
    component.unmount();
    const recivedAction = findActionByType(store, DESTROY_PAGE_ACTION);
    expect(recivedAction).toEqual(destroyPageAction());
  });

  it('should NOT render RequestPasswordResetPage when user IS authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
        user: {},
      },
    };
    const { component } = createComponentWithIntl(<RequestPasswordResetPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render RequestPasswordResetPage when user IS NOT authenticated', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      requestPasswordResetPage: {},
    };
    const { component } = createComponentWithIntl(<RequestPasswordResetPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render RequestPasswordResetPage with loading indicator when loading is in the props', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      requestPasswordResetPage: {
        loading: true,
      },
    };
    const { component } = createComponentWithIntl(<RequestPasswordResetPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render RequestPasswordResetPage with success message when sent request', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      requestPasswordResetPage: {
        sent: true,
      },
    };
    const { component } = createComponentWithIntl(<RequestPasswordResetPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render RequestPasswordResetPage with error message when errorMessage is in the props', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      requestPasswordResetPage: {
        errorMessage: 'serverErrorUnknown',
      },
    };
    const { component } = createComponentWithIntl(<RequestPasswordResetPage />, initialState);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
