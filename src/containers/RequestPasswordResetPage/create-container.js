import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import selectRequestPasswordResetPage from './selectors';
import messages from './messages';
import {
  requestPasswordResetAction,
  destroyPageAction,
  } from './actions';
import config from '../../config';

export default function createRequestPasswordResetContainer(PageComponent, options = {}) {
  const mapStateToProps = createStructuredSelector({
    RequestPasswordResetPage: selectRequestPasswordResetPage,
  });

  const mapDispatchToProps = {
    onSubmitForm: requestPasswordResetAction,
    onUnMount: destroyPageAction,
  };

  @compose(config.requestPasswordResetAuthWrapper)
  @injectIntl
  @connect(mapStateToProps, mapDispatchToProps)
  class RequestPasswordResetContainer extends PureComponent {
    static propTypes = {
      intl: PropTypes.object.isRequired,
      RequestPasswordResetPage: PropTypes.object.isRequired,
      onUnMount: PropTypes.func.isRequired,
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
        <div className={options.className || 'request-password-reset-page'}>
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
