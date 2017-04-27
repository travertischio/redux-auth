import { createSelector } from 'reselect';

/**
 * Direct selector to the signInPage state domain
 */
const selectSignInPageDomain = (state) => state.get('signInPage');

const makeSelectSignInPage = () => createSelector(
  selectSignInPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSignInPage;
export {
  selectSignInPageDomain,
};
