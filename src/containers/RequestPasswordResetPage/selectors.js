import { createSelector } from 'reselect';


const selectRequestPasswordResetPageDomain = (state) => state.get('requestPasswordResetPage');

const makeSelectRequestPasswordResetPage = () => createSelector(
  selectRequestPasswordResetPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectRequestPasswordResetPage;
export {
  selectRequestPasswordResetPageDomain,
};
