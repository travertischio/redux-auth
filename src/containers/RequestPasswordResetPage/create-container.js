import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';
import { createStructuredSelector } from 'reselect';
import UserIsNotAuthenticated from '../../hocs/AuthWrappers/UserIsNotAuthenticated';
import selectRequestPasswordResetPage from './selectors';
import messages from './messages';
import {
  requestPasswordResetAction,
  destroyPageAction,
  } from './actions';

export default function createRequestPasswordResetContainer(FormComponent) {
  const mapStateToProps = createStructuredSelector({
    RequestPasswordResetPage: selectRequestPasswordResetPage,
  });

  const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => dispatch(requestPasswordResetAction(values)),
    onUnMount: () => dispatch(destroyPageAction()),
  });

  @UserIsNotAuthenticated
  @injectIntl
  @connect(mapStateToProps, mapDispatchToProps)
  class RequestPasswordResetContainer extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
      intl: PropTypes.object,
      RequestPasswordResetPage: PropTypes.object,
      onSubmitForm: PropTypes.func,
      onUnMount: PropTypes.func,
    };

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

          <FormComponent onSubmit={onSubmitForm} />
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

  return RequestPasswordResetContainer;
}
