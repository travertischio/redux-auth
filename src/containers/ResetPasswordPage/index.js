/*
 *
 * ResetPasswordPage
 *
 */

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import compose from 'recompose/compose';
// TODO: move it to redux-auth
import { AuthenticationContext } from '../AuthenticationProvider/hocs';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import makeSelectResetPasswordPage from './selectors';
import messages from './messages';
import { resetPasswordAction, destroyPageAction } from './actions';

const mapStateToProps = createStructuredSelector({
  ResetPasswordPage: makeSelectResetPasswordPage(),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (values) => dispatch(resetPasswordAction(values)),
  onUnMount: () => dispatch(destroyPageAction()),
});

@injectIntl
@compose(AuthenticationContext)
@connect(mapStateToProps, mapDispatchToProps)
export default class ResetPasswordPage extends PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillUnmount() {
    this.props.onUnMount();
  }

  getErrorMessage() {
    let errorMessage = this.props.ResetPasswordPage.errorMessage;

    if (errorMessage) {
      errorMessage = messages[errorMessage];
    }

    return errorMessage;
  }

  renderInner() {
    const success = this.props.ResetPasswordPage.success;

    if (success) {
      return this.renderSuccessMessage();
    }

    return this.renderFormOrError();
  }

  renderSuccessMessage() {
    return (
      <div>
        <h1><FormattedMessage {...messages.successHeader} /></h1>
        <div>
          {this.renderGoNextBtn()}
        </div>
      </div>
    );
  }

  renderGoNextBtn() {
    if (this.props.isAuthenticated) {
      return (
        <Link to="/home">

        </Link>
      );
    }

    return (
      <Link to="/sign-in">

      </Link>
    );
  }

  renderFormOrError() {
    const loading = this.props.ResetPasswordPage.loading;
    const errorMessage = this.getErrorMessage();

    return (
      <div>
        <h1></h1>

        { loading && <div>Processing... Please wait.</div> }
        { errorMessage && <p>xxx</p> }

        {this.renderFormOrErrorInner()}
      </div>
    );
  }

  renderFormOrErrorInner() {
    const invalidToken = this.props.ResetPasswordPage.invalidToken;

    if (invalidToken) {
      return this.renderGoToRequestPasswordPageLink();
    }

    return this.renderForm();
  }

  renderGoToRequestPasswordPageLink() {
    return (
      <Link to="/request-password-reset">

      </Link>
    );
  }

  renderForm() {
    const {
      onSubmitForm,
    } = this.props;

    const initialValues = {
      token: this.props.routeParams.resetPasswordToken,
    };

    return (
      <div>
        <ResetPasswordForm onSubmit={onSubmitForm} initialValues={initialValues} />
      </div>
    );
  }

  render() {
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

        { this.renderInner() }
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  intl: PropTypes.object,
  ResetPasswordPage: PropTypes.object,
  routeParams: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  onSubmitForm: PropTypes.func,
  onUnMount: PropTypes.func,
};
