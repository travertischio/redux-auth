import { createSelector } from 'reselect';

/**
 * Direct selector to the resetPasswordPage state domain
 */
const selectResetPasswordPageDomain = (state) => state.get('resetPasswordPage');

const makeSelectResetPasswordPage = () => createSelector(
  selectResetPasswordPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectResetPasswordPage;
export {
  selectResetPasswordPageDomain,
};
