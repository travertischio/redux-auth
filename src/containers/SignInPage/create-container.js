import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import UserIsNotAuthenticated from '../../hocs/AuthWrappers/UserIsNotAuthenticated';
import selectSignInPage from './selectors';
import messages from './messages';
import {
  signInAction,
  destroyPageAction,
} from './actions';

export default function createSignInContainer(FormComponent) {
  const mapStateToProps = createStructuredSelector({
    SignInPage: selectSignInPage,
  });

  const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => dispatch(signInAction(values)),
    onUnMount: () => dispatch(destroyPageAction()),
  });

  @UserIsNotAuthenticated
  @injectIntl
  @connect(mapStateToProps, mapDispatchToProps)
  class SignInContainer extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
      intl: PropTypes.object,
      SignInPage: PropTypes.object,
      onSubmitForm: PropTypes.func,
      onUnMount: PropTypes.func,
    };

    componentWillUnmount() {
      this.props.onUnMount();
    }

    render() {
      const {
        onSubmitForm,
        SignInPage: {
          loading,
          errorMessage,
        },
      } = this.props;
      const { formatMessage } = this.props.intl;
      const pageTitle = formatMessage(messages.pageTitle);
      const pageDescription = formatMessage(messages.pageDescription);

      return (
        <div>
          <Helmet
            title={pageTitle}
            meta={[
              { name: 'description', content: pageDescription },
            ]}
          />

          { loading && <div>Processing... Please wait.</div> }
          { errorMessage && <div>{errorMessage}</div> }

          <FormComponent onSubmit={onSubmitForm} />
        </div>
      );
    }
  }

  return SignInContainer;
}
