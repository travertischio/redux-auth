import { fromJS } from 'immutable';
import selectResetPasswordPage, {
  selectResetPasswordPageDomain,
} from './selectors';

const state = fromJS({
  resetPasswordPage: {
    foo: 'bar',
  },
});

it('should return "resetPasswordPage" object from state when calling selectResetPasswordPage(state)', () => {
  expect(selectResetPasswordPage(state)).toEqual(state.get('resetPasswordPage').toJS());
});

it('should return "resetPasswordPage" immutable object from state when calling selectResetPasswordPageDomain(state)', () => {
  expect(selectResetPasswordPageDomain(state)).toEqual(state.get('resetPasswordPage'));
});
