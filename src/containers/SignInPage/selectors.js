import { createSelector } from 'reselect';

const selectSignInPageDomain = (state) => state.get('signInPage');

const selectSignInPage = createSelector(
  selectSignInPageDomain,
  (substate) => substate.toJS()
);

export default selectSignInPage;
export {
  selectSignInPageDomain,
};
