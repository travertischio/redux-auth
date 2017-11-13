import { createSelector } from 'reselect';

const selectSignInConfirmCodePageDomain = (state) => state.get('signInConfirmCodePage');

const selectSignInConfirmCodePage = createSelector(
  selectSignInConfirmCodePageDomain,
  (substate) => substate.toJS()
);

export default selectSignInConfirmCodePage;
export {
  selectSignInConfirmCodePageDomain,
};
