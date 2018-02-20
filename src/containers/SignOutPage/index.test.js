import React from 'react';
import {
  getStoreWithInitialState,
  findActionByType,
  mountWithIntl,
} from 'react-unit-testing-utils';
import { SIGN_OUT_ACTION } from '~/containers/AuthenticationProvider/constants';
import SignOutPage from './index';

describe('<SignOutPage />', () => {
  it('should dispatch action SIGN_IN_ACTION on mount component', () => {
    const store = getStoreWithInitialState({
      auth: {},
      signInPage: {},
    });

    mountWithIntl(<SignOutPage />, {
      store,
    });

    const recivedAction = findActionByType(store, SIGN_OUT_ACTION);

    expect(recivedAction.type).toEqual(SIGN_OUT_ACTION);
  });
});
