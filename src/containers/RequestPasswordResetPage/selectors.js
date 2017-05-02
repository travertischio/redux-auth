import { createSelector } from 'reselect';

const selectRequestPasswordResetPageDomain = (state) => state.get('requestPasswordResetPage');

const selectRequestPasswordResetPage = createSelector(
  selectRequestPasswordResetPageDomain,
  (substate) => substate.toJS()
);

export default selectRequestPasswordResetPage;
export {
  selectRequestPasswordResetPageDomain,
};
