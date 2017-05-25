import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import UserIsNotAuthenticated from '../../hocs/AuthWrappers/UserIsNotAuthenticated';
import selectRequestPasswordResetPage from './selectors';
import messages from './messages';
import {
  requestPasswordResetAction,
  destroyPageAction,
  } from './actions';

export default function createRequestPasswordResetContainer(PageComponent) {
  const mapStateToProps = createStructuredSelector({
    RequestPasswordResetPage: selectRequestPasswordResetPage,
  });

  const mapDispatchToProps = {
    onSubmitForm: requestPasswordResetAction,
    onUnMount: destroyPageAction,
  };

  @UserIsNotAuthenticated
  @injectIntl
  @connect(mapStateToProps, mapDispatchToProps)
  class RequestPasswordResetContainer extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
      intl: PropTypes.object,
      RequestPasswordResetPage: PropTypes.object,
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

          <PageComponent errorMessage={this.getErrorMessage()} {...this.props} />
        </div>
      );
    }
  }

  return RequestPasswordResetContainer;
}
