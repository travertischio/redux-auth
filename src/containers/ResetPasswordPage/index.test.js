import React from 'react';
import {
  getStoreWithInitialState,
  findActionByType,
  mountWithIntl,
  createComponentWithIntl,
} from 'react-unit-testing-utils';
import ResetPasswordPage from './index';
import { destroyPageAction } from './actions';
import {
  RESET_PASSWORD_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

describe('<ResetPasswordPage />', () => {
  it('should dispatch action RESET_PASSWORD_ACTION when fill and submit the form', () => {
    const store = getStoreWithInitialState({
      auth: {
        isAuthenticated: false,
      },
      resetPasswordPage: {},
    });

    const routeParams = { resetPasswordToken: 'XYZ123' };
    const wrapper = mountWithIntl(<ResetPasswordPage routeParams={routeParams} />, {
      store,
    });

    const newPassword = 'pass123';

    wrapper.find('input[name="new_password"]').simulate('change', { target: { value: newPassword } });
    wrapper.find('input[name="re_new_password"]').simulate('change', { target: { value: newPassword } });
    wrapper.find('form').simulate('submit');

    const recivedAction = findActionByType(store, RESET_PASSWORD_ACTION);
    expect(recivedAction.type).toEqual(RESET_PASSWORD_ACTION);
  });

  it('should dispatch action DESTROY_PAGE_ACTION when the component unmount', () => {
    const initialState = {
      resetPasswordPage: {},
    };
    const { component, store } = renderResetPasswordPageWithState(initialState);
    component.unmount();
    const recivedAction = findActionByType(store, DESTROY_PAGE_ACTION);
    expect(recivedAction).toEqual(destroyPageAction());
  });

  it('should render ResetPasswordPage with the reset password form', () => {
    const initialState = {
      resetPasswordPage: {},
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with loading indicator when loading is in the props', () => {
    const initialState = {
      resetPasswordPage: {
        loading: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with success message', () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
      resetPasswordPage: {
        success: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with success message', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
      },
      resetPasswordPage: {
        success: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with invalid token error message', () => {
    const initialState = {
      resetPasswordPage: {
        invalidToken: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with invalid token error message', () => {
    const initialState = {
      resetPasswordPage: {
        invalidToken: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with error message when errorMessage is in the props', () => {
    const initialState = {
      resetPasswordPage: {
        errorMessage: 'serverErrorInvalid',
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });
});

function expectComponentWithStateToMatchSnapshot(initialState) {
  const { component } = renderResetPasswordPageWithState(initialState);
  expect(component.toJSON()).toMatchSnapshot();
}

function renderResetPasswordPageWithState(initialState) {
  const routeParams = { resetPasswordToken: 'XYZ123' };
  return createComponentWithIntl(<ResetPasswordPage routeParams={routeParams} />, initialState);
}
