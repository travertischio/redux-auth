import { fromJS } from 'immutable';
import { stateAuthenticated } from '~/test.data';
import {
  selectAuthenticationDomain,
  selectTokenData,
  selectToken,
  selectTokenExpiryTime,
  selectIsAuthenticated,
  selectUser,
  selectIsReady,
} from './selectors';

const state = fromJS(stateAuthenticated);

it('should return "auth" object from state when calling selectAuthenticationDomain(state)', () => {
  expect(selectAuthenticationDomain(state).toJS()).toEqual(stateAuthenticated.auth);
});

it('should return token from state when calling selectTokenData(state)', () => {
  expect(selectTokenData(state).toJS()).toEqual(stateAuthenticated.auth.tokenData);
});

it('should return token from state when calling selectToken(state)', () => {
  expect(selectToken(state)).toEqual(stateAuthenticated.auth.tokenData.key);
});

it('should return selectTokenExpiryTime from state when calling selectTokenExpiryTime(state)', () => {
  expect(selectTokenExpiryTime(state)).toEqual(stateAuthenticated.auth.tokenData.expireAt);
});

it('should return isAuthenticated from state when calling selectIsAuthenticated(state)', () => {
  expect(selectIsAuthenticated(state)).toBeTruthy();
});

it('should return user from state when calling selectUser(state)', () => {
  expect(selectUser(state)).toEqual(stateAuthenticated.auth.userData);
});

it('should return isReady from state when calling selectIsReady(state)', () => {
  expect(selectIsReady(state)).toEqual(stateAuthenticated.auth.isReady);
});
