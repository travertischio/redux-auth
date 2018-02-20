/*
 *
 * ResetPasswordPage
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import ResetPasswordForm from '~/components/ResetPasswordForm';
import createResetPasswordContainer from './create-container';
import messages from './messages';

class ResetPasswordPage extends PureComponent {
  static propTypes = {
    ResetPasswordPage: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    errorMessage: PropTypes.object,
  };

  static defaultProps = {
    errorMessage: null,
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
          <FormattedMessage {...messages.goToHomeBtnLabel} />
        </Link>
      );
    }

    return (
      <Link to="/sign-in">
        <FormattedMessage {...messages.goToSignInBtnLabel} />
      </Link>
    );
  }

  renderFormOrError() {
    const {
      ResetPasswordPage: {
        loading,
      },
      errorMessage,
    } = this.props;

    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>

        { loading && <div>Processing... Please wait.</div> }
        { errorMessage && <p><FormattedMessage {...errorMessage} /></p> }

        {this.renderFormOrErrorInner()}
      </div>
    );
  }

  renderFormOrErrorInner() {
    if (this.props.ResetPasswordPage.invalidToken) {
      return this.renderGoToRequestPasswordPageLink();
    }

    return this.renderForm();
  }

  renderGoToRequestPasswordPageLink() {
    return (
      <Link to="/request-password-reset">
        <FormattedMessage {...messages.requestNewPasswordBtnLabel} />
      </Link>
    );
  }

  renderForm() {
    const {
      onSubmitForm,
      match,
    } = this.props;

    const initialValues = {
      token: match.params.resetPasswordToken,
    };

    return (
      <div>
        <ResetPasswordForm
          onSubmit={onSubmitForm}
          initialValues={initialValues}
        />
      </div>
    );
  }

  render() {
    if (this.props.ResetPasswordPage.success) {
      return this.renderSuccessMessage();
    }

    return this.renderFormOrError();
  }
}

export default createResetPasswordContainer(ResetPasswordPage);
