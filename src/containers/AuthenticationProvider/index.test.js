import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { getStoreWithInitialState } from 'react-unit-testing-utils';
import _isFunction from 'lodash/isFunction';
import AuthenticationProvider from './index';
import { refreshTokenAction } from './actions';

describe('<AuthenticationProvider /> and hasTokenRefreshed is false', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = getStoreWithInitialState({
      auth: {
        hasTokenRefreshed: false,
        isAuthenticated: false,
      },
    });

    wrapper = shallow(<AuthenticationProvider><p>I am child.</p></AuthenticationProvider>, {
      context: { store },
    });
  });

  it('should has a hasTokenRefreshed prop with false value', () => {
    expect(wrapper.props().hasTokenRefreshed).toBeFalsy();
  });

  it('should has a isAuthenticated prop with false value', () => {
    expect(wrapper.props().isAuthenticated).toBeFalsy();
  });

  it('should has a refreshToken prop and be a function', () => {
    expect(_isFunction(wrapper.props().refreshToken)).toBeTruthy();
  });

  it('should render "loading" component', () => {
    expect(wrapper.html()).toEqual('<div>Loading...</div>');
  });

  describe('when component mounted', () => {
    beforeEach(() => {
      mount(<AuthenticationProvider />, {
        context: { store },
      });
    });

    it('should dispatch action REFRESH_TOKEN_ACTION', () => {
      expect(store.getActions()[0]).toEqual(refreshTokenAction());
    });
  });
});

describe('<AuthenticationProvider /> and hasTokenRefreshed is true', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = getStoreWithInitialState({
      auth: {
        hasTokenRefreshed: true,
        isAuthenticated: false,
      },
    });

    wrapper = shallow(<AuthenticationProvider><p>I am child.</p></AuthenticationProvider>, {
      context: { store },
    });
  });

  it('should render children', () => {
    expect(wrapper.html()).toEqual('<div><p>I am child.</p></div>');
  });
});
