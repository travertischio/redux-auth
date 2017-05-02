import { fromJS } from 'immutable';
import selectSignInPage, {
  selectSignInPageDomain,
} from './selectors';

const state = fromJS({
  signInPage: {
    foo: 'bar',
  },
});

it('should return "signInPage" object from state when calling selectSignInPage(state)', () => {
  expect(selectSignInPage(state)).toEqual(state.get('signInPage').toJS());
});

it('should return "signInPage" immutable object from state when calling selectSignInPageDomain(state)', () => {
  expect(selectSignInPageDomain(state)).toEqual(state.get('signInPage'));
});
