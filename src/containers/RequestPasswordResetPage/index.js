/*
 *
 * RequestPasswordResetPage
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import createRequestPasswordResetContainer from './create-container';
import RequestPasswordResetForm from '../../components/RequestPasswordResetForm';
import messages from './messages';

class RequestPasswordResetPage extends PureComponent {
  static propTypes = {
    RequestPasswordResetPage: PropTypes.object,
    onSubmitForm: PropTypes.func,
    errorMessage: PropTypes.string,
  };

  renderSuccessMessage() {
    return (
      <div>
        <h1><FormattedMessage {...messages.successHeader} /></h1>
        <p><FormattedMessage {...messages.successMessage} /></p>
        <p><FormattedMessage {...messages.successMessageSpamTip} /></p>
      </div>
    );
  }

  renderRequestPasswordResetForm() {
    const {
      onSubmitForm,
      RequestPasswordResetPage: {
        loading,
      },
    } = this.props;

    const errorMessage = this.props.errorMessage;

    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>

        { loading && <div>Processing... Please wait.</div> }
        { errorMessage && <p><FormattedMessage {...errorMessage} /></p> }

        <RequestPasswordResetForm onSubmit={onSubmitForm} />
      </div>
    );
  }

  render() {
    const sent = this.props.RequestPasswordResetPage.sent;

    if (sent) {
      return this.renderSuccessMessage();
    }

    return this.renderRequestPasswordResetForm();
  }
}


export default createRequestPasswordResetContainer(RequestPasswordResetPage);
