import React from 'react';
import {
  getStoreWithInitialState,
  findActionByType,
  mountWithIntl,
  createComponentWithRouter,
} from 'react-unit-testing-utils';
import ResetPasswordPage from './index';
import { destroyPageAction } from './actions';
import {
  RESET_PASSWORD_ACTION,
  DESTROY_PAGE_ACTION,
} from './constants';

const routeMatch = {
  params: { resetPasswordToken: 'XYZ123' },
};

describe('<ResetPasswordPage />', () => {
  it('should dispatch action RESET_PASSWORD_ACTION when fill and submit the form', () => {
    const store = getStoreWithInitialState({
      auth: {},
      resetPasswordPage: {},
    });

    const wrapper = mountWithIntl(<ResetPasswordPage match={routeMatch} />, {
      store,
    });

    const newPassword = 'pass123';

    wrapper.find('input[name="newPassword"]').simulate('change', { target: { value: newPassword } });
    wrapper.find('input[name="reNewPassword"]').simulate('change', { target: { value: newPassword } });
    wrapper.find('form').simulate('submit');

    const recivedAction = findActionByType(store, RESET_PASSWORD_ACTION);
    expect(recivedAction.type).toEqual(RESET_PASSWORD_ACTION);
  });

  it('should dispatch action DESTROY_PAGE_ACTION when the component unmount', () => {
    const initialState = {
      auth: {},
      resetPasswordPage: {
        loading: false,
        errorMessage: 'serverErrorInvalid',
      },
    };
    const { wrapper, store } = renderResetPasswordPageWithState(initialState);

    wrapper.unmount();

    const recivedAction = findActionByType(store, DESTROY_PAGE_ACTION);

    expect(recivedAction).toEqual(destroyPageAction());
  });

  it('should render ResetPasswordPage with the reset password form', () => {
    const initialState = {
      auth: {},
      resetPasswordPage: {},
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with loading indicator when loading is in the props', () => {
    const initialState = {
      auth: {},
      resetPasswordPage: {
        loading: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with success message', () => {
    const initialState = {
      auth: {},
      resetPasswordPage: {
        success: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with invalid token error message', () => {
    const initialState = {
      auth: {},
      resetPasswordPage: {
        invalidToken: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with invalid token error message', () => {
    const initialState = {
      auth: {},
      resetPasswordPage: {
        invalidToken: true,
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });

  it('should render ResetPasswordPage with error message when errorMessage is in the props', () => {
    const initialState = {
      auth: {},
      resetPasswordPage: {
        errorMessage: 'serverErrorInvalid',
      },
    };
    expectComponentWithStateToMatchSnapshot(initialState);
  });
});

function expectComponentWithStateToMatchSnapshot(initialState) {
  const { wrapper } = renderResetPasswordPageWithState(initialState);
  expect(wrapper.toJSON()).toMatchSnapshot();
}

function renderResetPasswordPageWithState(initialState) {
  return createComponentWithRouter(<ResetPasswordPage match={routeMatch} />, initialState);
}
