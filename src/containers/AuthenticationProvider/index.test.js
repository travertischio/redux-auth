import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { getStoreWithInitialState } from 'react-unit-testing-utils';
import _isFunction from 'lodash/isFunction';
import AuthenticationProvider from './index';
import { extendTokenLifetimeAction } from './actions';

describe('<AuthenticationProvider /> and isReady is false', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = getStoreWithInitialState({
      auth: {
        isReady: false,
      },
    });

    wrapper = shallow(<AuthenticationProvider><p>I am child.</p></AuthenticationProvider>, {
      context: { store },
    });
  });

  it('should has a isReady prop with false value', () => {
    expect(wrapper.props().isReady).toBeFalsy();
  });

  it('should has a isAuthenticated prop with false value', () => {
    expect(wrapper.props().isAuthenticated).toBeFalsy();
  });

  it('should has a extendTokenLifetime prop and be a function', () => {
    expect(_isFunction(wrapper.props().extendTokenLifetime)).toBeTruthy();
  });

  it('should render "loading" component', () => {
    expect(wrapper.html()).toEqual('<div class="loading-auth">Loading...</div>');
  });

  describe('when component mounted', () => {
    beforeEach(() => {
      mount(<AuthenticationProvider />, {
        context: { store },
      });
    });

    it('should dispatch action EXTEND_TOKEN_LIFETIME_ACTION', () => {
      expect(store.getActions()[0]).toEqual(extendTokenLifetimeAction());
    });
  });
});

describe('<AuthenticationProvider /> and isReady is true', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = getStoreWithInitialState({
      auth: {
        isReady: true,
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
