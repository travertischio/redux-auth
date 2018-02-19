import { fromJS } from 'immutable';
import selectRequestPasswordResetPage, { selectRequestPasswordResetPageDomain } from './selectors';

const state = fromJS({
  requestPasswordResetPage: {
    foo: 'bar',
  },
});

it('should return "requestPasswordResetPage" object from state when calling selectRequestPasswordResetPage(state)', () => {
  expect(selectRequestPasswordResetPage(state)).toEqual(state.get('requestPasswordResetPage').toJS());
});

it('should return "requestPasswordResetPage" immutable object from state when calling selectRequestPasswordResetPageDomain(state)', () => {
  expect(selectRequestPasswordResetPageDomain(state)).toEqual(state.get('requestPasswordResetPage'));
});
