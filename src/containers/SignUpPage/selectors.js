import { createSelector } from 'reselect';

const selectSignUpPageDomain = (state) => state.get('signUpPage');

const selectSignUpPage = createSelector(
  selectSignUpPageDomain,
  (substate) => substate.toJS()
);

export default selectSignUpPage;
export {
  selectSignUpPageDomain,
};
