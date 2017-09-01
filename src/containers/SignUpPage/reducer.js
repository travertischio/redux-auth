/*
 *
 * SignUpPage reducer
 *
 */
import { fromJS } from 'immutable';
import {
  SIGN_UP_ACTION,
  SIGN_UP_SUCCESS_ACTION,
  SIGN_UP_FAILED_ACTION,
} from './constants';

const initialState = fromJS({});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_ACTION:
      return onSignUpAction(state);
    case SIGN_UP_SUCCESS_ACTION:
      return onSignUpSuccessAction(state);
    case SIGN_UP_FAILED_ACTION:
      return onSignUpFailedAction(state, action.payload);
    default:
      return state;
  }
}

export const onSignUpAction = (state) => state.merge({
  loading: true,
  errorMessage: null,
});

export const onSignUpSuccessAction = (state) => state.merge({
  loading: false,
  errorMessage: null,
});

export const onSignUpFailedAction = (state, rejection) => {
  const { response } = rejection;
  let errorMessage = 'Ooops, something went wrong, please try again later.';

  if (response.status === 400) {
    errorMessage = response.data.non_field_errors;
  }

  return state.merge({
    loading: false,
    errorMessage,
  });
};

export default signUpPageReducer;
