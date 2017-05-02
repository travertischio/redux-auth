/*
 *
 * RequestPasswordResetPage
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import RequestPasswordResetForm from '../../components/RequestPasswordResetForm';
import UserIsNotAuthenticated from '../../hocs/AuthWrappers/UserIsNotAuthenticated';
import makeSelectRequestPasswordResetPage from './selectors';
import messages from './messages';
import { requestPasswordResetAction, destroyPageAction } from './actions';

const mapStateToProps = createStructuredSelector({
  RequestPasswordResetPage: makeSelectRequestPasswordResetPage(),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (values) => dispatch(requestPasswordResetAction(values)),
  onUnMount: () => dispatch(destroyPageAction()),
});

@UserIsNotAuthenticated
@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
export default class RequestPasswordResetPage extends PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillUnmount() {
    this.props.onUnMount();
  }

  getErrorMessage() {
    let errorMessage = this.props.RequestPasswordResetPage.errorMessage;

    if (errorMessage) {
      errorMessage = messages[errorMessage];
    }

    return errorMessage;
  }

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

    const errorMessage = this.getErrorMessage();

    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>

        { loading && <div>Processing... Please wait.</div> }
        { errorMessage && <p><FormattedMessage {...errorMessage} /></p> }

        <RequestPasswordResetForm onSubmit={onSubmitForm} />
      </div>
    );
  }

  renderInner() {
    const sent = this.props.RequestPasswordResetPage.sent;

    if (sent) {
      return this.renderSuccessMessage();
    }

    return this.renderRequestPasswordResetForm();
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

RequestPasswordResetPage.propTypes = {
  intl: PropTypes.object,
  RequestPasswordResetPage: PropTypes.object,
  onSubmitForm: PropTypes.func,
  onUnMount: PropTypes.func,
};
