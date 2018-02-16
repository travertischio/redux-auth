import React from 'react';
import {
  // getStoreWithInitialState,
  // findActionByType,
  // mountWithIntl,
  createComponentWithRouter,
} from 'react-unit-testing-utils';
// import { SubmissionError } from 'redux-form/immutable';
import SignUpPage from './index';
// import { destroyPageAction } from './actions';
// import {
//   // SIGN_UP_ACTION,
//   // DESTROY_PAGE_ACTION,
// } from './constants';

describe('<SignUpPage />', () => {
  // describe('when submitting form', () => {
  //   let wrapper;
  //   const store = getStoreWithInitialState({
  //     auth: {},
  //     signUpPage: {},
  //   });


  //   beforeEach(() => {
  //     wrapper = mountWithIntl(<SignUpPage />, {
  //       store,
  //     });
  //   });

  //   it('should reject SubmissionError when backend rejects request', (done) => {
  //     const errorResponse = {
  //       response: {
  //         data: {
  //           nonFieldErrors: ['Username already exists'],
  //         },
  //       },
  //     };

  //     wrapper
  //       .children()
  //       .get(0) // 1
  //       .props
  //       .onSubmitForm()
  //       .catch((error) => {
  //         expect(error).toEqual(new SubmissionError(errorResponse));
  //         done();
  //       });

  //     const recivedAction = findActionByType(store, SIGN_UP_ACTION);

  //     recivedAction.reject(errorResponse);
  //   });

  //   it('should dispatch action SIGN_UP_ACTION', () => {
  //     const firstName = 'John';
  //     const email = 'tester@test.com';
  //     const password = 'zxy123';

  //     wrapper.find('input[name="firstName"]').simulate('change', { target: { value: firstName } });
  //     wrapper.find('input[name="email"]').simulate('change', { target: { value: email } });
  //     wrapper.find('input[name="password"]').simulate('change', { target: { value: password } });
  //     wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { value: password } });
  //     wrapper.find('form').simulate('submit');

  //     const recivedAction = findActionByType(store, SIGN_UP_ACTION);

  //     expect(recivedAction.type).toEqual(SIGN_UP_ACTION);
  //   });
  // });

  // it('should dispatch action DESTROY_PAGE_ACTION when the component unmount', () => {
  //   const initialState = {
  //     auth: {},
  //     signUpPage: {},
  //   };
  //   const { wrapper, store } = createComponentWithRouter(<SignUpPage />, initialState);
  //   wrapper.unmount();
  //   const recivedAction = findActionByType(store, DESTROY_PAGE_ACTION);
  //   expect(recivedAction).toEqual(destroyPageAction());
  // });

  it('should NOT render SignUpPage when user IS authenticated', () => {
    const initialState = {
      auth: {
        tokenData: {},
        userData: {},
      },
    };
    const { wrapper } = createComponentWithRouter(<SignUpPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render SignUpPage when user IS NOT authenticated', () => {
    const initialState = {
      auth: {},
      signUpPage: {},
    };
    const { wrapper } = createComponentWithRouter(<SignUpPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render SignUpPage with loading indicator when loading is in the props', () => {
    const initialState = {
      auth: {},
      signUpPage: {
        loading: true,
      },
    };
    const { wrapper } = createComponentWithRouter(<SignUpPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render SignUpPage with error message when errorMessage is in the props', () => {
    const initialState = {
      auth: {},
      signUpPage: {
        errorMessage: 'Ooops, something went wrong, please try again later.',
      },
    };
    const { wrapper } = createComponentWithRouter(<SignUpPage />, initialState);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
