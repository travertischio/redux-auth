import { fromJS } from 'immutable';
// import {
//   // SIGN_IN_ACTION,
//   // SIGN_IN_SUCCESS_ACTION,
//   // SIGN_IN_FAILED_ACTION,
//   // DESTROY_PAGE_ACTION,
// } from './constants';

const initialState = fromJS({});

export default function signInConfirmCodeReducer(state = initialState, action) {
  switch (action.type) {
    // case SIGN_IN_ACTION:
    //   return onSignInAction(state);
    // case SIGN_IN_SUCCESS_ACTION:
    //   return onSignSuccessAction(state);
    // case SIGN_IN_FAILED_ACTION:
    //   return onSignFailedAction(state, action.payload);
    // case DESTROY_PAGE_ACTION:
    //   return onDestroyPageAction(state);
    default:
      return state;
  }
}
