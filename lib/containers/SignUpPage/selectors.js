import { createSelector } from 'reselect';

/**
 * Direct selector to the signUpPage state domain
 */
const selectSignUpPageDomain = (state) => state.get('signUpPage');

const makeSelectSignUpPage = () => createSelector(
  selectSignUpPageDomain,
  // TODO drop toJS
  (substate) => substate.toJS()
);

export default makeSelectSignUpPage;
export {
  selectSignUpPageDomain,
};
