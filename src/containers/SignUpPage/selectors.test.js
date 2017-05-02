import { fromJS } from 'immutable';
import selectSignUpPage, {
  selectSignUpPageDomain,
} from './selectors';

const state = fromJS({
  signUpPage: {
    foo: 'bar',
  },
});

it('should return "selectSignUpPage" object from state when calling selectSignUpPage(state)', () => {
  expect(selectSignUpPage(state)).toEqual(state.get('signUpPage').toJS());
});

it('should return "signUpPage" immutable object from state when calling selectSignUpPageDomain(state)', () => {
  expect(selectSignUpPageDomain(state)).toEqual(state.get('signUpPage'));
});
