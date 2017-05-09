import { fromJS } from 'immutable';
import {
  selectAuthenticationDomain,
  selectToken,
  selectTokenExpiryTime,
  selectIsAuthenticated,
  selectUser,
  selectHasTokenRefreshed,
} from './selectors';

const state = fromJS({
  auth: {
    token: 'XYZ123',
    tokenExpiryTime: 25456,
    isAuthenticated: true,
    hasTokenRefreshed: true,
    user: {
      id: 1,
      email: 'user@ydtech.co',
      first_name: 'John',
      last_name: 'Smith',
    },
  },
});

it('should return "auth" object from state when calling selectAuthenticationDomain(state)', () => {
  expect(selectAuthenticationDomain(state)).toEqual(state.get('auth'));
});

it('should return token from state when calling selectToken(state)', () => {
  expect(selectToken(state)).toEqual(state.getIn(['auth', 'token']));
});

it('should return selectTokenExpiryTime from state when calling selectTokenExpiryTime(state)', () => {
  expect(selectTokenExpiryTime(state)).toEqual(state.getIn(['auth', 'tokenExpiryTime']));
});

it('should return isAuthenticated from state when calling selectIsAuthenticated(state)', () => {
  expect(selectIsAuthenticated(state)).toEqual(state.getIn(['auth', 'isAuthenticated']));
});

it('should return user from state when calling selectUser(state)', () => {
  expect(selectUser(state)).toEqual(state.getIn(['auth', 'user']).toJS());
});

it('should return hasTokenRefreshed from state when calling selectHasTokenRefreshed(state)', () => {
  expect(selectHasTokenRefreshed(state)).toEqual(state.getIn(['auth', 'hasTokenRefreshed']));
});
